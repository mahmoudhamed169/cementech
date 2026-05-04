"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pusher from "pusher-js";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TrackingDriver {
  driver_id: string;
  driver_name: string;
  code: string;
  phone: string;
}

export interface DriverPosition {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface TrackingData {
  channel: string;
  event: string;
  drivers: TrackingDriver[];
}

interface PusherLocationEvent {
  driver_id: string;
  lat: number;
  lng: number;
  timestamp: string;
}

// ─── Cache helpers ────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 10 * 60 * 1000;
const cacheKey = (id: string) => `tracking_positions_${id}`;

function loadCachedPositions(orderId: string): Record<string, DriverPosition> {
  try {
    const raw = localStorage.getItem(cacheKey(orderId));
    if (!raw) return {};
    const { positions, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL_MS) {
      localStorage.removeItem(cacheKey(orderId));
      return {};
    }
    return positions;
  } catch {
    return {};
  }
}

function saveCachedPositions(
  orderId: string,
  positions: Record<string, DriverPosition>,
) {
  try {
    localStorage.setItem(
      cacheKey(orderId),
      JSON.stringify({ positions, savedAt: Date.now() }),
    );
  } catch {}
}

// ─── Fetch tracking info ──────────────────────────────────────────────────────

async function fetchOrderTracking(orderId: string): Promise<TrackingData> {
  const res = await fetch(`/api/orders/${orderId}/tracking`, {
    headers: { lang: document.documentElement.lang ?? "ar" },
  });

  if (!res.ok) throw new Error("Failed to fetch tracking data");

  const json = await res.json();
  return json.data as TrackingData;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu";

export function useOrderTracking(orderId: string, enabled = true) {
  const [positions, setPositions] = useState<Record<string, DriverPosition>>(
    () => loadCachedPositions(orderId),
  );

  const pusherRef = useRef<Pusher | null>(null);
  const channelNameRef = useRef<string | null>(null);

  // 1. Fetch channel + driver list
  const query = useQuery({
    queryKey: ["orderTracking", orderId],
    queryFn: () => fetchOrderTracking(orderId),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  // 2. Subscribe to Pusher whenever channel info arrives
  useEffect(() => {
    const data = query.data;
    if (!data || !PUSHER_KEY) return;

    if (channelNameRef.current === data.channel) return;

    if (pusherRef.current && channelNameRef.current) {
      pusherRef.current.unsubscribe(channelNameRef.current);
    }

    if (!pusherRef.current) {
      pusherRef.current = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER });
    }

    channelNameRef.current = data.channel;
    const channel = pusherRef.current.subscribe(data.channel);

    channel.bind(data.event, (payload: PusherLocationEvent) => {
      setPositions((prev) => {
        const next = {
          ...prev,
          [payload.driver_id]: {
            lat: payload.lat,
            lng: payload.lng,
            timestamp: payload.timestamp,
          },
        };
        saveCachedPositions(orderId, next);
        return next;
      });
    });

    return () => {
      channel.unbind_all();
      pusherRef.current?.unsubscribe(data.channel);
      channelNameRef.current = null;
    };
  }, [query.data, orderId]);

  // 3. Disconnect on unmount
  useEffect(() => {
    return () => {
      pusherRef.current?.disconnect();
      pusherRef.current = null;
    };
  }, []);

  const drivers = query.data?.drivers ?? [];
  const liveDrivers = drivers.filter((d) => d.driver_id in positions);

  return {
    drivers,
    positions,
    liveDrivers,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
