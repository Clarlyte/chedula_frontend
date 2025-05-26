import { useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { v4 as uuidv4 } from 'uuid';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  duration?: number;
}

export function useNotifications() {
  const { notifications, addNotification, removeNotification } = useStore();

  const notify = useCallback(
    (message: string, type: NotificationType = 'info', options: NotificationOptions = {}) => {
      const id = uuidv4();
      const notification = {
        id,
        type,
        message,
        duration: options.duration || 5000,
      };

      addNotification(notification);

      if (notification.duration) {
        setTimeout(() => {
          removeNotification(id);
        }, notification.duration);
      }

      return id;
    },
    [addNotification, removeNotification]
  );

  const success = useCallback(
    (message: string, options?: NotificationOptions) => notify(message, 'success', options),
    [notify]
  );

  const error = useCallback(
    (message: string, options?: NotificationOptions) => notify(message, 'error', options),
    [notify]
  );

  const info = useCallback(
    (message: string, options?: NotificationOptions) => notify(message, 'info', options),
    [notify]
  );

  const warning = useCallback(
    (message: string, options?: NotificationOptions) => notify(message, 'warning', options),
    [notify]
  );

  return {
    notifications,
    notify,
    success,
    error,
    info,
    warning,
    removeNotification,
  };
} 