import { NotificationCategory, NotificationPriority } from '@/types/universal-notifications';
import { UNIVERSAL_NOTIFICATION_CONFIG } from '../domain/notification.constants';

export class QuietHoursEngine {
  /**
   * Determines if a notification should be deferred due to quiet hours policy
   */
  static isQuietHoursActive(
    category: NotificationCategory,
    priority: NotificationPriority,
    quietStartStr: string = UNIVERSAL_NOTIFICATION_CONFIG.DEFAULT_QUIET_HOURS.start,
    quietEndStr: string = UNIVERSAL_NOTIFICATION_CONFIG.DEFAULT_QUIET_HOURS.end
  ): boolean {
    // SECURITY & AUTHENTICATION & URGENT priority bypass quiet hours completely
    if (
      category === 'SECURITY' ||
      category === 'AUTHENTICATION' ||
      priority === 'URGENT' ||
      priority === 'HIGH'
    ) {
      return false;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentMins = currentHour * 60 + currentMinute;

    const [startH, startM] = quietStartStr.split(':').map(Number);
    const [endH, endM] = quietEndStr.split(':').map(Number);

    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    if (startMins > endMins) {
      // Overnight range e.g. 23:00 to 08:00
      return currentMins >= startMins || currentMins < endMins;
    } else {
      return currentMins >= startMins && currentMins < endMins;
    }
  }
}