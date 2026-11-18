import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../src/constants/theme';
import { useAppStore } from '../src/store/useAppStore';
import { GlassCard } from '../src/components/ui/GlassCard';
import { Button } from '../src/components/ui/Button';
import { Header } from '../src/components/ui/Header';
import { Badge } from '../src/components/ui/Badge';
import { Task, Topic } from '../src/db/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function PreviewScreen() {
  const router = useRouter();
  const topics = useAppStore((state) => state.topics);
  const tasks = useAppStore((state) => state.tasks);

  const [localTopics, setLocalTopics] = useState<Topic[]>(topics);
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  const handleDeleteTask = (taskId: string) => {
    Haptics.selectionAsync().catch(() => {});
    setLocalTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleConfirmPlan = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    Alert.alert('Curriculum Confirmed', 'Your custom roadmap is active.', [
      { text: 'Go to Today', onPress: () => router.replace('/(tabs)/today') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Curriculum Preview"
        subtitle={`${localTopics.length} weeks • ${localTasks.length} total tasks`}
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {localTopics.map((topic) => {
          const topicTasks = localTasks.filter((t) => t.topic_ids.includes(topic.id));
          const easies = topicTasks.filter((t) => t.difficulty === 'Easy');
          const mediums = topicTasks.filter((t) => t.difficulty === 'Medium');
          const hards = topicTasks.filter((t) => t.difficulty === 'Hard');

          return (
            <GlassCard key={topic.id} variant="elevated" style={styles.topicCard}>
              <View style={styles.topicHeader}>
                <Badge label={`Week ${topic.week_number}`} variant="neutral" size="sm" />
                <Text style={[Typography.h2, styles.topicTitle]}>{topic.title}</Text>
                <Text style={[Typography.caption, styles.subHeader]}>
                  {topic.concepts.length} concepts • {topicTasks.length} problems
                </Text>
              </View>

              {/* Easy List */}
              {easies.length > 0 && (
                <View style={styles.diffGroup}>
                  <Text style={[Typography.caption, styles.diffHeading, { color: Colors.dark.difficultyEasy }]}>
                    EASY ({easies.length})
                  </Text>
                  {easies.map((task) => (
                    <View key={task.id} style={styles.taskItem}>
                      <View style={styles.taskLeft}>
                        <Ionicons
                          name={
                            task.status === 'premium'
                              ? 'lock-closed'
                              : task.status === 'needs_link'
                              ? 'help-circle-outline'
                              : 'link-outline'
                          }
                          size={15}
                          color={
                            task.status === 'premium'
                              ? Colors.dark.difficultyPaid
                              : task.status === 'needs_link'
                              ? Colors.dark.error
                              : Colors.dark.primary
                          }
                        />
                        <Text style={[Typography.body, styles.taskName]}>{task.title}</Text>
                      </View>
                      <Pressable onPress={() => handleDeleteTask(task.id)} hitSlop={8}>
                        <Ionicons name="trash-outline" size={16} color={Colors.dark.textMuted} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              {/* Medium List */}
              {mediums.length > 0 && (
                <View style={styles.diffGroup}>
                  <Text style={[Typography.caption, styles.diffHeading, { color: Colors.dark.difficultyMedium }]}>
                    MEDIUM ({mediums.length})
                  </Text>
                  {mediums.map((task) => (
                    <View key={task.id} style={styles.taskItem}>
                      <View style={styles.taskLeft}>
                        <Ionicons
                          name={
                            task.status === 'premium'
                              ? 'lock-closed'
                              : task.status === 'needs_link'
                              ? 'help-circle-outline'
                              : 'link-outline'
                          }
                          size={15}
                          color={
                            task.status === 'premium'
                              ? Colors.dark.difficultyPaid
                              : task.status === 'needs_link'
                              ? Colors.dark.error
                              : Colors.dark.primary
                          }
                        />
                        <Text style={[Typography.body, styles.taskName]}>{task.title}</Text>
                      </View>
                      <Pressable onPress={() => handleDeleteTask(task.id)} hitSlop={8}>
                        <Ionicons name="trash-outline" size={16} color={Colors.dark.textMuted} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              {/* Hard List */}
              {hards.length > 0 && (
                <View style={styles.diffGroup}>
                  <Text style={[Typography.caption, styles.diffHeading, { color: Colors.dark.difficultyHard }]}>
                    HARD ({hards.length})
                  </Text>
                  {hards.map((task) => (
                    <View key={task.id} style={styles.taskItem}>
                      <View style={styles.taskLeft}>
                        <Ionicons
                          name={
                            task.status === 'premium'
                              ? 'lock-closed'
                              : task.status === 'needs_link'
                              ? 'help-circle-outline'
                              : 'link-outline'
                          }
                          size={15}
                          color={
                            task.status === 'premium'
                              ? Colors.dark.difficultyPaid
                              : task.status === 'needs_link'
                              ? Colors.dark.error
                              : Colors.dark.primary
                          }
                        />
                        <Text style={[Typography.body, styles.taskName]}>{task.title}</Text>
                      </View>
                      <Pressable onPress={() => handleDeleteTask(task.id)} hitSlop={8}>
                        <Ionicons name="trash-outline" size={16} color={Colors.dark.textMuted} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </GlassCard>
          );
        })}

        <Button
          title="Confirm Curriculum & Build Journey"
          onPress={handleConfirmPlan}
          variant="primary"
          size="lg"
          style={{ marginTop: Spacing.md, marginBottom: Spacing['2xl'] }}
        />
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
  topicCard: {
    marginBottom: Spacing.lg,
  },
  topicHeader: {
    marginBottom: Spacing.md,
  },
  topicTitle: {
    color: Colors.dark.textPrimary,
    marginTop: 4,
  },
  subHeader: {
    color: Colors.dark.textMuted,
    marginTop: 2,
  },
  diffGroup: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  diffHeading: {
    fontWeight: '700',
    marginBottom: 6,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  taskName: {
    color: Colors.dark.textPrimary,
    marginLeft: 8,
    fontSize: 14,
  },
});
