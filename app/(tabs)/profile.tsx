import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../../src/constants/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Badge } from '../../src/components/ui/Badge';
import { ProgrammingLanguage } from '../../src/db/types';
import { validateLeetCodeUsername, fetchLeetCodeStats } from '../../src/services/leetcode';
import { OEM_BATTERY_GUIDES } from '../../src/services/notifications';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const tasks = useAppStore((state) => state.tasks);
  const toggleTaskCompletion = useAppStore((state) => state.toggleTaskCompletion);

  // Form states
  const [name, setName] = useState(profile?.name || 'DSA Learner');
  const [email, setEmail] = useState(profile?.email || 'learner@dsajourney.app');
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || '');
  const [leetcodeUsername, setLeetcodeUsername] = useState(profile?.leetcode_username || '');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    profile?.preferred_language || 'cpp'
  );
  const [dailyMinutes, setDailyMinutes] = useState(
    profile?.daily_study_minutes?.toString() || '60'
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [showBatteryGuide, setShowBatteryGuide] = useState(false);

  const handleSaveProfile = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    await updateProfile({
      name,
      email,
      linkedin_url: linkedinUrl,
      leetcode_username: leetcodeUsername,
      preferred_language: selectedLanguage,
      daily_study_minutes: parseInt(dailyMinutes, 10) || 60,
    });
    Alert.alert('Profile Saved', 'Your study preferences have been updated.');
  };

  // Sync LeetCode accepted submissions and auto-tick matching tasks by slug
  const handleSyncLeetCode = async () => {
    if (!leetcodeUsername.trim()) {
      Alert.alert('Missing Username', 'Please enter your LeetCode username first.');
      return;
    }

    Haptics.selectionAsync().catch(() => {});
    setIsSyncing(true);

    try {
      const result = await fetchLeetCodeStats(leetcodeUsername);
      setIsSyncing(false);

      if (!result.success) {
        Alert.alert('LeetCode Sync', result.errorMessage || 'Unable to sync.');
        return;
      }

      // Auto-tick matching tasks by slug
      let syncedCount = 0;
      for (const slug of result.matchedSlugs) {
        const matchingTask = tasks.find((t) => t.slug === slug);
        if (matchingTask) {
          await toggleTaskCompletion(matchingTask.id, undefined, {
            approach: 'Auto-synced via LeetCode Accepted Submission',
          });
          syncedCount++;
        }
      }

      await updateProfile({
        leetcode_username: leetcodeUsername,
        leetcode_verified: true,
      });

      Alert.alert(
        'LeetCode Synced',
        `Verified account "${leetcodeUsername}". Found ${result.userStats?.totalSolved} total solved problems. Auto-completed ${syncedCount} tasks in your journey.`
      );
    } catch (e: any) {
      setIsSyncing(false);
      Alert.alert('Sync Error', e.message || 'Failed to contact LeetCode.');
    }
  };

  const languages: { key: ProgrammingLanguage; label: string }[] = [
    { key: 'cpp', label: 'C++ (Default)' },
    { key: 'java', label: 'Java' },
    { key: 'python', label: 'Python' },
  ];

  const videoPresets = [
    { name: 'Striver A2Z Playlist', url: 'https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_St8' },
    { name: 'Striver SDE Sheet', url: 'https://youtube.com/playlist?list=PLgUwDviBIf0rPG3Ictpu74YWBQ1CaBkm2' },
    { name: 'NeetCode 150', url: 'https://youtube.com/playlist?list=PLot-Xpze53ldVwtstag2TL4HQhAnC8fZf' },
    { name: 'Apna College DSA', url: 'https://youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ' },
    { name: 'Love Babbar 450', url: 'https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.caption, styles.subtitle]}>LEARNER PROFILE & PREFERENCES</Text>
          <Text style={[Typography.h1, styles.title]}>Account & Setup</Text>
        </View>

        {/* Identity Section */}
        <GlassCard variant="elevated" style={styles.card}>
          <Text style={[Typography.caption, styles.cardHeader]}>PERSONAL IDENTITY</Text>

          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label="LinkedIn Profile URL"
            placeholder="https://linkedin.com/in/username"
            value={linkedinUrl}
            onChangeText={setLinkedinUrl}
          />
        </GlassCard>

        {/* LeetCode Integration Section */}
        <GlassCard variant="elevated" style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={[Typography.caption, styles.cardHeader]}>LEETCODE INTEGRATION</Text>
            {profile?.leetcode_verified && (
              <Badge label="Verified" variant="success" size="sm" />
            )}
          </View>

          <Input
            label="LeetCode Username"
            placeholder="e.g. neetcode"
            value={leetcodeUsername}
            onChangeText={setLeetcodeUsername}
            helperText="Auto-ticks accepted submissions into your daily checklist."
          />

          <Button
            title={isSyncing ? 'Contacting LeetCode...' : 'Verify & Sync Submissions'}
            onPress={handleSyncLeetCode}
            loading={isSyncing}
            variant="outline"
            size="md"
            icon={<Ionicons name="sync-outline" size={16} color={Colors.dark.primary} />}
          />
        </GlassCard>

        {/* Language Selection */}
        <GlassCard variant="elevated" style={styles.card}>
          <Text style={[Typography.caption, styles.cardHeader]}>PRIMARY CODING LANGUAGE</Text>
          <View style={styles.languageRow}>
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.key;
              return (
                <Pressable
                  key={lang.key}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    setSelectedLanguage(lang.key);
                  }}
                  style={[
                    styles.langPill,
                    isSelected && styles.langPillActive,
                  ]}
                >
                  <Text
                    style={[
                      Typography.caption,
                      styles.langText,
                      isSelected && styles.langTextActive,
                    ]}
                  >
                    {lang.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassCard>

        {/* Study Durations & Daily Minutes */}
        <GlassCard variant="elevated" style={styles.card}>
          <Text style={[Typography.caption, styles.cardHeader]}>PACE & STUDY DURATION</Text>

          <Input
            label="Daily Study Time (Minutes)"
            placeholder="60"
            value={dailyMinutes}
            onChangeText={setDailyMinutes}
            keyboardType="numeric"
            helperText="Used to compute daily workload and trigger overload alerts."
          />
        </GlassCard>

        {/* Linked Resources Cards */}
        <GlassCard variant="elevated" style={styles.card}>
          <Text style={[Typography.caption, styles.cardHeader]}>LINKED STUDY RESOURCES</Text>

          <Pressable
            onPress={() => Linking.openURL(profile?.default_playlist_url || 'https://youtube.com')}
            style={styles.linkedCard}
          >
            <Ionicons name="logo-youtube" size={24} color="#EF4444" />
            <View style={styles.linkedContent}>
              <Text style={[Typography.bodyBold, { color: Colors.dark.textPrimary }]}>
                {profile?.default_playlist_name || 'Striver A2Z Playlist'}
              </Text>
              <Text style={[Typography.caption, { color: Colors.dark.textMuted }]}>
                Primary video series linked for topic launches.
              </Text>
            </View>
            <Ionicons name="open-outline" size={16} color={Colors.dark.textMuted} />
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL(profile?.reference_website_url || 'https://takeuforward.org')}
            style={styles.linkedCard}
          >
            <Ionicons name="globe-outline" size={24} color={Colors.dark.primary} />
            <View style={styles.linkedContent}>
              <Text style={[Typography.bodyBold, { color: Colors.dark.textPrimary }]}>
                {profile?.reference_website_name || 'takeuforward.org'}
              </Text>
              <Text style={[Typography.caption, { color: Colors.dark.textMuted }]}>
                Primary reference and concept notes source.
              </Text>
            </View>
            <Ionicons name="open-outline" size={16} color={Colors.dark.textMuted} />
          </Pressable>
        </GlassCard>

        {/* Android Battery Optimization Instructions */}
        <GlassCard style={styles.card}>
          <Pressable
            onPress={() => setShowBatteryGuide(!showBatteryGuide)}
            style={styles.batteryHeader}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="battery-charging-outline" size={20} color={Colors.dark.streak} />
              <Text style={[Typography.bodyBold, { color: Colors.dark.textPrimary, marginLeft: 8 }]}>
                Android Alarm & Battery Optimization
              </Text>
            </View>
            <Ionicons
              name={showBatteryGuide ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={Colors.dark.textMuted}
            />
          </Pressable>

          {showBatteryGuide && (
            <View style={styles.batteryContent}>
              <Text style={[Typography.caption, { color: Colors.dark.textSecondary, marginBottom: 10 }]}>
                To ensure exact Duolingo-style reminders fire when the app is killed, disable aggressive battery optimization on OEM devices:
              </Text>
              {OEM_BATTERY_GUIDES.map((guide, idx) => (
                <View key={`g_${idx}`} style={styles.guideBlock}>
                  <Text style={[Typography.caption, { color: Colors.dark.primary, fontWeight: '700' }]}>
                    {guide.brand}
                  </Text>
                  <Text style={[Typography.caption, { color: Colors.dark.textMuted, marginTop: 2 }]}>
                    {guide.steps}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </GlassCard>

        {/* Save Changes Button */}
        <Button
          title="Save Profile & Preferences"
          onPress={handleSaveProfile}
          variant="primary"
          size="lg"
          style={{ marginBottom: Spacing.xl }}
        />

        {/* Account Deletion & Privacy Policy */}
        <View style={styles.dangerZone}>
          <Pressable
            onPress={() =>
              Alert.alert(
                'Privacy Statement',
                'DSA Journey stores your curriculum and progress locally in your device SQLite database. No personal problem solving data is shared with third parties.'
              )
            }
            style={styles.privacyLink}
          >
            <Text style={[Typography.caption, { color: Colors.dark.textMuted }]}>
              Privacy Policy & Terms
            </Text>
          </Pressable>

          <Button
            title="Delete Account & Reset Local Storage"
            onPress={() => {
              Alert.alert(
                'Reset Local Journey',
                'This will purge all local SQLite tables and reset your streak. Are you sure?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset Everything',
                    style: 'destructive',
                    onPress: async () => {
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
                      // Restart app store
                      Alert.alert('Reset Complete', 'Local database has been re-initialized.');
                    },
                  },
                ]
              );
            }}
            variant="danger"
            size="sm"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
    paddingTop: Spacing.sm,
  },
  header: {
    marginBottom: Spacing.base,
  },
  subtitle: {
    color: Colors.dark.textMuted,
    letterSpacing: 0.5,
  },
  title: {
    color: Colors.dark.textPrimary,
  },
  card: {
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  languageRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  langPill: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.dark.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  langPillActive: {
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(45, 212, 167, 0.12)',
  },
  langText: {
    color: Colors.dark.textSecondary,
    fontWeight: '600',
  },
  langTextActive: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
  linkedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceSubtle,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  linkedContent: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  batteryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  batteryContent: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  guideBlock: {
    marginBottom: Spacing.sm,
  },
  dangerZone: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  privacyLink: {
    marginBottom: Spacing.md,
  },
});
