import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure default notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NOTIFICATION_CHANNELS = {
  DAILY_REMINDERS: 'daily-reminders',
  STREAK_ALERTS: 'streak-alerts',
  WEEKLY_REVISION: 'weekly-revision',
};

const EVENING_NOTIFICATION_TAG = 'evening_incomplete_reminder';
const ESCALATION_TAG_FIRM = 'escalation_930';
const ESCALATION_TAG_LAST_CHANCE = 'escalation_1045';

/**
 * Configure Android notification channels with distinct priorities and tones
 */
export async function setupAndroidChannels() {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.DAILY_REMINDERS, {
    name: 'Daily Reminders',
    description: 'Morning agenda and study notifications',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#14B8A6',
    enableLights: true,
    enableVibrate: true,
  });

  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.STREAK_ALERTS, {
    name: 'Streak Alerts',
    description: 'Reminders when your streak is at risk',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 300, 200, 300],
    lightColor: '#F5A524',
    enableLights: true,
    enableVibrate: true,
  });

  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.WEEKLY_REVISION, {
    name: 'Weekly Revision',
    description: 'Sunday comprehensive review reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 200],
    lightColor: '#6366F1',
    enableLights: true,
    enableVibrate: true,
  });
}

/**
 * Request notification permissions with Android 13+ support
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus === 'granted') {
    await setupAndroidChannels();
    return true;
  }

  return false;
}

/**
 * Schedule Morning Nudge: "Day 12 is ready. 3 tasks, about 50 min."
 */
export async function scheduleMorningNudge(
  dayNumber: number,
  taskCount: number,
  estimatedMinutes: number,
  timeStr: string = '08:00'
) {
  const [hour, minute] = timeStr.split(':').map(Number);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Day ${dayNumber} is ready`,
      body: `${taskCount} tasks, about ${estimatedMinutes} min. Start early to stay ahead.`,
      channelId: NOTIFICATION_CHANNELS.DAILY_REMINDERS,
      data: { route: '/(tabs)/today' },
    } as any,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

/**
 * Schedule Smart Evening Escalation sequence:
 * - 20:00 (Friendly)
 * - 21:30 (Firm)
 * - 22:45 (Last chance: "Your streak ends in 75 minutes")
 */
export async function scheduleEveningEscalation(
  streakDays: number,
  remainingTasksCount: number
) {
  // Cancel previous evening triggers first
  await cancelEveningReminderIfComplete();

  // 1. Friendly 8:00 PM
  await Notifications.scheduleNotificationAsync({
    identifier: EVENING_NOTIFICATION_TAG,
    content: {
      title: 'Wrap up your daily DSA goal',
      body: `You have ${remainingTasksCount} problems remaining. A quick session keeps your pace solid.`,
      channelId: NOTIFICATION_CHANNELS.DAILY_REMINDERS,
      data: { route: '/(tabs)/today' },
    } as any,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });

  // 2. Firm 9:30 PM
  await Notifications.scheduleNotificationAsync({
    identifier: ESCALATION_TAG_FIRM,
    content: {
      title: 'Keep the momentum going',
      body: '10-minute recall and remaining practice are waiting before night wraps up.',
      channelId: NOTIFICATION_CHANNELS.DAILY_REMINDERS,
      data: { route: '/(tabs)/today' },
    } as any,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 21,
      minute: 30,
    },
  });

  // 3. Last Chance 10:45 PM
  await Notifications.scheduleNotificationAsync({
    identifier: ESCALATION_TAG_LAST_CHANCE,
    content: {
      title: 'Streak at risk',
      body: `Your ${streakDays}-day streak ends in 75 minutes. Protect your progress with today's tasks.`,
      channelId: NOTIFICATION_CHANNELS.STREAK_ALERTS,
      data: { route: '/(tabs)/today' },
    } as any,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 22,
      minute: 45,
    },
  });
}

/**
 * Smart Cancellation: Cancel all evening reminders the moment today's tasks are done!
 */
export async function cancelEveningReminderIfComplete() {
  await Notifications.cancelScheduledNotificationAsync(EVENING_NOTIFICATION_TAG).catch(() => {});
  await Notifications.cancelScheduledNotificationAsync(ESCALATION_TAG_FIRM).catch(() => {});
  await Notifications.cancelScheduledNotificationAsync(ESCALATION_TAG_LAST_CHANCE).catch(() => {});
}

/**
 * OEM Battery Optimization Explanations
 */
export const OEM_BATTERY_GUIDES = [
  {
    brand: 'Samsung (One UI)',
    steps: 'Settings -> Apps -> DSA Journey -> Battery -> Select "Unrestricted". Turn off "Put unused apps to sleep".',
  },
  {
    brand: 'Xiaomi / Redmi / POCO (MIUI / HyperOS)',
    steps: 'Settings -> Apps -> Manage apps -> DSA Journey -> Enable "Autostart". Under Battery saver, select "No restrictions".',
  },
  {
    brand: 'OnePlus / Oppo / Realme (OxygenOS / ColorOS)',
    steps: 'Settings -> Battery -> More settings -> Optimize battery use -> DSA Journey -> Select "Don\'t optimize".',
  },
  {
    brand: 'Vivo / iQOO (Funtouch OS)',
    steps: 'Settings -> Battery -> High background power consumption -> Enable "DSA Journey".',
  },
];
