"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ZoneMap from "../shared/zone-map";
import { ZoneFormData } from "../use-zone-modal";

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  formData: ZoneFormData;
  onLocationSelect: (lat: number, lng: number) => void;
};

export default function StepLocation({ formData, onLocationSelect }: Props) {
  const t = useTranslations("settingsPage.tabs.delivery.modal.stepLocation");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&accept-language=ar`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    onLocationSelect(parseFloat(result.lat), parseFloat(result.lon));
    setQuery(result.display_name);
    setResults([]);
  };

  return (
    <div className="space-y-4">
      <div className="text-start">
        <h3 className="text-lg font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="relative">
          {loading ? (
            <Loader2 size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400 animate-spin" />
          ) : (
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
          )}
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="ps-9"
          />
        </div>

        {/* Results Dropdown */}
        {results.length > 0 && (
          <div className="absolute top-full start-0 end-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(result)}
                className="w-full text-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0 flex items-center gap-2"
              >
                <MapPin size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">{result.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative">
        <ZoneMap
          lat={formData.lat}
          lng={formData.lng}
          onLocationSelect={onLocationSelect}
          fullWidth
        />

        {formData.lat !== 0 && formData.lng !== 0 && (
          <div className="absolute bottom-3 start-3 end-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
              </p>
              <p className="text-xs text-gray-400">
                {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}