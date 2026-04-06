// map-notification.ts

import { ApiNotification } from "../../types/notifications/notification";
import { Notification, NotificationSeverity } from "@/src/app/(dashboard)/notifications/_types/notification";

function resolveSeverity(type: string): NotificationSeverity {
  switch (type) {
    case "success": return "success";
    case "error":   return "error";
    default:        return "alert";
  }
}

function resolveActions(title: string) {
  const t = title.toLowerCase();

  if (t.includes("driver registration") || t.includes("join"))
    return [
      { label: "مراجعة طلب الانضمام", variant: "outline", onClick: "review_join" },
    ];

  if (t.includes("rejected") || t.includes("canceled"))
    return [
      { label: "تخصيص الآن",    variant: "outline", onClick: "assign_now"   },
      { label: "تعليم كمقروء", variant: "ghost",   onClick: "mark_read"    },
    ];

  if (t.includes("loading request"))
    return [
      { label: "مراجعة الطلب", variant: "outline", onClick: "review_join" },
      { label: "تعليم كمقروء", variant: "ghost",   onClick: "mark_read"   },
    ];

  return [];
}

export function mapApiNotification(api: ApiNotification): Notification {
  return {
    id:          api.id,
    title:       api.title,
    description: api.description,
    read:        api.is_read,
    timestamp:   api.created_at,
    severity:    resolveSeverity(api.type),
    actions:     resolveActions(api.title),
  };
}