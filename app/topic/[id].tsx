import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../../src/constants/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Button } from '../../src/components/ui/Button';
import { Header } from '../../src/components/ui/Header';
import { Badge } from '../../src/components/ui/Badge';
import { TaskCard } from '../../src/components/domain/TaskCard';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function TopicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const topics = useAppStore((state) => state.topics);
  const tasks = useAppStore((state) => state.tasks);
  const completions = useAppStore((state) => state.completions);
  const profile = useAppStore((state) => state.profile);
  const updateTopicVideo = useAppStore((state) => state.updateTopicVideo);
  const toggleTaskCompletion = useAppStore((state) => state.toggleTaskCompletion);

  const topic = topics.find((t) => t.id === id);
  const topicTasks = tasks.filter((t) => t.topic_ids.includes(id || ''));

  const [videoUrl, setVideoUrl] = useState(topic?.custom_video_url || '');

  const handleSaveVideo = async () => {
    if (!topic) return;
    Haptics.selectionAsync().catch(() => {});
    await updateTopicVideo(topic.id, videoUrl);
    Alert.alert('Video Saved', 'Custom video URL saved for this topic.');
  };

  const handleSearchYouTube = () => {
    const query = encodeURIComponent(`${topic?.title} ${profile?.default_playlist_name || 'Striver A2Z'}`);
    Linking.openURL(`https://www.youtube.com/results?search_query=${query}`).catch(() => {});
  };

  if (!topic) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Topic Details" showBack />
        <View style={styles.notFound}>
          <Text style={[Typography.body, { color: Colors.dark.textMuted }]}>
            Topic not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={`Week ${topic.week_number}: ${topic.title}`}
        subtitle={`${topicTasks.length} practice problems`}
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Video & Learning Resources */}
        <GlassCard variant="elevated" style={styles.card}>
          <Text style={[Typography.caption, styles.cardHeader]}>TOPIC STUDY VIDEO</Text>

          <View style={styles.videoInputRow}>
            <TextInput
              style={styles.videoInput}
              placeholder="Paste specific YouTube video or lecture URL..."
              placeholderTextColor={Colors.dark.textDisabled}
              value={videoUrl}
              onChangeText={setVideoUrl}
            />
            <Button
              title="Save"
              onPress={handleSaveVideo}
              variant="primary"
              size="sm"
              style={{ marginLeft: Spacing.sm }}
            />
          </View>

          <Button
            title="Search in My Playlist"
            onPress={handleSearchYouTube}
            variant="outline"
            size="sm"
            icon={<Ionicons name="logo-youtube" size={16} color={Colors.dark.primary} />}
            style={{ marginTop: Spacing.sm }}
          />
        </GlassCard>

        {/* Concept List Checklist */}
        {topic.concepts && topic.concepts.length > 0 && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.caption, styles.cardHeader]}>CONCEPTS TO MASTER</Text>
            {topic.concepts.map((concept, idx) => (
              <View key={`conc_${idx}`} style={styles.conceptRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.dark.primary} />
                <Text style={[Typography.body, styles.conceptText]}>{concept}</Text>
              </View>
            ))}
          </GlassCard>
        )}

        {/* Problems List */}
        <View style={styles.problemsSection}>
          <Text style={[Typography.caption, styles.cardHeader]}>
            PROBLEMS IN THIS TOPIC ({topicTasks.length})
          </Text>

          {topicTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              completion={completions[task.id]}
              onToggleDone={(notes) => toggleTaskCompletion(task.id, undefined, notes)}
            />
          ))}
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
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  videoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoInput: {
    flex: 1,
    backgroundColor: Colors.dark.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: BorderRadius.md,
    color: Colors.dark.textPrimary,
    padding: Spacing.sm,
    fontSize: 13,
  },
  conceptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  conceptText: {
    color: Colors.dark.textSecondary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  problemsSection: {
    marginBottom: Spacing.xl,
  },
});
