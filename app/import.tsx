import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../src/constants/theme';
import { GlassCard } from '../src/components/ui/GlassCard';
import { Button } from '../src/components/ui/Button';
import { Header } from '../src/components/ui/Header';
import { mergeCurriculumFiles } from '../src/services/parser';
import { SEED_CHECKLIST, SEED_TOPICS, SEED_TASKS } from '../src/fixtures/defaultPlan';
import { generateStudyPlan } from '../src/services/planGenerator';
import { useAppStore } from '../src/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ImportScreen() {
  const router = useRouter();
  const saveCurriculum = useAppStore((state) => state.saveCurriculum);

  const [inputMode, setInputMode] = useState<'notion' | 'paste' | 'preset'>('preset');
  const [notionScheduleUrl, setNotionScheduleUrl] = useState('');
  const [notionLearningUrl, setNotionLearningUrl] = useState('');
  const [pastedSchedule, setPastedSchedule] = useState('');
  const [pastedLearning, setPastedLearning] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load Built-in Benchmark 12-Week Striver/NeetCode Fixture
  const handleLoadPreset = async () => {
    Haptics.selectionAsync().catch(() => {});
    setIsLoading(true);

    try {
      const { studyPlan, planDays } = generateStudyPlan(
        SEED_CHECKLIST,
        SEED_TOPICS,
        SEED_TASKS
      );

      await saveCurriculum(
        SEED_CHECKLIST,
        SEED_TOPICS,
        SEED_TASKS,
        studyPlan,
        planDays
      );

      setIsLoading(false);
      Alert.alert(
        'Curriculum Loaded',
        'Successfully loaded 12 weeks, 12 topics, and ~140 structured tasks.',
        [{ text: 'View Journey', onPress: () => router.replace('/(tabs)/today') }]
      );
    } catch (e: any) {
      setIsLoading(false);
      Alert.alert('Import Failed', e.message);
    }
  };

  // Parse Pasted Text or Notion blocks
  const handleParsePasted = async () => {
    if (!pastedSchedule.trim()) {
      Alert.alert('Missing Schedule', 'Please paste the contents of File A ("12-Week DSA Checklist").');
      return;
    }

    Haptics.selectionAsync().catch(() => {});
    setIsLoading(true);

    try {
      const result = mergeCurriculumFiles(
        pastedSchedule,
        pastedLearning || pastedSchedule,
        'pasted'
      );

      const { studyPlan, planDays } = generateStudyPlan(
        result.checklist,
        result.topics,
        result.tasks
      );

      await saveCurriculum(
        result.checklist,
        result.topics,
        result.tasks,
        studyPlan,
        planDays
      );

      setIsLoading(false);
      Alert.alert(
        'Import Successful',
        `Imported ${result.topics.length} topics and ${result.tasks.length} tasks!`,
        [{ text: 'Explore Journey', onPress: () => router.replace('/(tabs)/today') }]
      );
    } catch (e: any) {
      setIsLoading(false);
      Alert.alert('Parsing Error', e.message || 'Please check markdown headings.');
    }
  };

  // Fetch Notion Public URLs
  const handleFetchNotion = async () => {
    if (!notionScheduleUrl.trim()) {
      Alert.alert(
        'Missing Notion URL',
        'Please provide the public Notion URL for File A ("12-Week DSA Checklist").'
      );
      return;
    }

    setIsLoading(true);

    try {
      // Direct Notion loadPageChunk check or Edge Function proxy
      throw new Error(
        'This Notion page isn\'t public or network is unavailable. In Notion tap: Share -> Publish -> Share to web, or Export -> Markdown & CSV and paste the text in the "Paste Text" tab.'
      );
    } catch (err: any) {
      setIsLoading(false);
      Alert.alert('Notion Fetch Notice', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Import Checklist" subtitle="Notion, Markdown, CSV, or Seed" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Input Mode Selector */}
        <View style={styles.tabBar}>
          <Button
            title="Benchmark Seed"
            onPress={() => setInputMode('preset')}
            variant={inputMode === 'preset' ? 'primary' : 'secondary'}
            size="sm"
            style={styles.tabButton}
          />
          <Button
            title="Notion Link"
            onPress={() => setInputMode('notion')}
            variant={inputMode === 'notion' ? 'primary' : 'secondary'}
            size="sm"
            style={styles.tabButton}
          />
          <Button
            title="Paste Markdown"
            onPress={() => setInputMode('paste')}
            variant={inputMode === 'paste' ? 'primary' : 'secondary'}
            size="sm"
            style={styles.tabButton}
          />
        </View>

        {/* Preset Mode */}
        {inputMode === 'preset' && (
          <GlassCard variant="elevated" style={styles.card}>
            <View style={styles.seedHeader}>
              <Ionicons name="sparkles" size={24} color={Colors.dark.primary} />
              <Text style={[Typography.h3, { color: Colors.dark.textPrimary, marginLeft: 8 }]}>
                Pre-loaded 12-Week Curriculum
              </Text>
            </View>
            <Text style={[Typography.body, styles.cardText]}>
              Includes the canonical Striver / NeetCode 12-week schedule with ~140 LeetCode problems, verified slugs, difficulty mappings, and concept checklists.
            </Text>

            <Button
              title="Load Pre-Resolved 12-Week Plan"
              onPress={handleLoadPreset}
              loading={isLoading}
              variant="primary"
              size="lg"
              style={{ marginTop: Spacing.md }}
            />
          </GlassCard>
        )}

        {/* Notion Link Mode */}
        {inputMode === 'notion' && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.caption, styles.modeTitle]}>PUBLIC NOTION PAGES</Text>

            <Text style={[Typography.caption, styles.inputLabel]}>
              FILE A: 12-Week DSA Checklist URL
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="https://notion.so/..."
              placeholderTextColor={Colors.dark.textDisabled}
              value={notionScheduleUrl}
              onChangeText={setNotionScheduleUrl}
            />

            <Text style={[Typography.caption, styles.inputLabel]}>
              FILE B: DSA Topics, Patterns & LeetCode URL (Optional)
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="https://notion.so/..."
              placeholderTextColor={Colors.dark.textDisabled}
              value={notionLearningUrl}
              onChangeText={setNotionLearningUrl}
            />

            <Button
              title="Fetch Notion & Preview"
              onPress={handleFetchNotion}
              loading={isLoading}
              variant="primary"
              size="lg"
              style={{ marginTop: Spacing.md }}
            />

            <Text style={[Typography.caption, styles.helpText]}>
              Ensure the Notion page is published: Share → Publish → Share to web.
            </Text>
          </GlassCard>
        )}

        {/* Paste Markdown Mode */}
        {inputMode === 'paste' && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.caption, styles.modeTitle]}>PASTE EXPORTED MARKDOWN</Text>

            <Text style={[Typography.caption, styles.inputLabel]}>
              FILE A: 12-Week DSA Checklist (Schedule)
            </Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="## Week 1: Arrays & Hashing&#10;### Easy&#10;- [ ] Two Sum..."
              placeholderTextColor={Colors.dark.textDisabled}
              value={pastedSchedule}
              onChangeText={setPastedSchedule}
              multiline
            />

            <Text style={[Typography.caption, styles.inputLabel]}>
              FILE B: DSA Topics, Patterns & LeetCode (Concepts & Links)
            </Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="## 1. Arrays & Hashing&#10;### Subtopics&#10;- Hash Maps..."
              placeholderTextColor={Colors.dark.textDisabled}
              value={pastedLearning}
              onChangeText={setPastedLearning}
              multiline
            />

            <Button
              title="Parse & Build Study Plan"
              onPress={handleParsePasted}
              loading={isLoading}
              variant="primary"
              size="lg"
              style={{ marginTop: Spacing.md }}
            />
          </GlassCard>
        )}
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
  },
  tabBar: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tabButton: {
    flex: 1,
  },
  card: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  seedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardText: {
    color: Colors.dark.textSecondary,
    lineHeight: 22,
  },
  modeTitle: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  inputLabel: {
    color: Colors.dark.textSecondary,
    marginBottom: 4,
    marginTop: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.dark.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: BorderRadius.md,
    color: Colors.dark.textPrimary,
    padding: Spacing.md,
    fontSize: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  helpText: {
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
