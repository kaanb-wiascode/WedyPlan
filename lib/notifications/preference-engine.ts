import { NotificationCategory, NotificationChannel } from '@/types/notification-engine';

// Mock in-memory User Preferences store representation
const userPreferencesStore = new Map<string, boolean>();

export class PreferenceEngine {
  /**
   * Checks if a user has opted-in for a specific channel & category
   */
  static async isChannelAllowed(
    userId: string,
    category: NotificationCategory,
    channel: NotificationChannel
  ): Promise<boolean> {
    // SECURITY & SYSTEM categories bypass preferences
    if (category === 'SECURITY' || category === 'SYSTEM') {
      return true;
    }

    const key = `${userId}:${category}:${channel}`;
    const preference = userPreferencesStore.get(key);

    // Default: Allowed unless explicitly set to false
    return preference !== undefined ? preference : true;
  }

  /**
   * Updates user channel preferences
   */
  static async setUserPreference(
    userId: string,
    category: NotificationCategory,
    channel: NotificationChannel,
    isEnabled: boolean
  ): Promise<void> {
    const key = `${userId}:${category}:${channel}`;
    userPreferencesStore.set(key, isEnabled);
  }
}