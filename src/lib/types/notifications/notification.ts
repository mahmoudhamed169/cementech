// types/notifications/notification.ts

export interface ApiNotification {
  id: string;
  user_id: string | null;
  for_admin: boolean;
  meta_data_link: string | null;
  type: string;
  title: string;
  description: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: ApiNotification[];
}