import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { format, subDays, isSameDay, parseISO } from 'date-fns';

interface HeatmapProps {
  completedDates: string[]; // array of ISO or YYYY-MM-DD strings
  totalWeeks?: number;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  completedDates,
  totalWeeks = 12,
}) => {
  const daysTotal = totalWeeks * 7;
  const today = new Date();

  // Count completions per date
  const countsByDate = new Map<string, number>();
  completedDates.forEach((d) => {
    const formatted = d.substring(0, 10);
    countsByDate.set(formatted, (countsByDate.get(formatted) || 0) + 1);
  });

  // Build grid of days: 7 rows (days of week) x `totalWeeks` columns
  const weeks: { dateStr: string; count: number }[][] = [];
  let currentDay = subDays(today, daysTotal - 1);

  for (let w = 0; w < totalWeeks; w++) {
    const weekDays = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = format(currentDay, 'yyyy-MM-dd');
      weekDays.push({
        dateStr,
        count: countsByDate.get(dateStr) || 0,
      });
      currentDay = subDays(currentDay, -1);
    }
    weeks.push(weekDays);
  }

  const getCellColor = (count: number) => {
    if (count === 0) return 'rgba(255, 255, 255, 0.04)';
    if (count === 1) return 'rgba(45, 212, 167, 0.35)';
    if (count === 2) return 'rgba(45, 212, 167, 0.65)';
    return '#2DD4A7';
  };

  const dayLabels = ['M', 'W', 'F'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[Typography.caption, styles.title]}>12-WEEK CONSISTENCY HEATMAP</Text>
        <View style={styles.legend}>
          <Text style={[Typography.caption, styles.legendLabel]}>Less</Text>
          <View style={[styles.legendBox, { backgroundColor: 'rgba(255, 255, 255, 0.04)' }]} />
          <View style={[styles.legendBox, { backgroundColor: 'rgba(45, 212, 167, 0.35)' }]} />
          <View style={[styles.legendBox, { backgroundColor: 'rgba(45, 212, 167, 0.65)' }]} />
          <View style={[styles.legendBox, { backgroundColor: '#2DD4A7' }]} />
          <Text style={[Typography.caption, styles.legendLabel]}>More</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollArea}>
        <View style={styles.dayLabelColumn}>
          <Text style={[Typography.caption, styles.dayText]}>M</Text>
          <Text style={[Typography.caption, styles.dayText]}>W</Text>
          <Text style={[Typography.caption, styles.dayText]}>F</Text>
        </View>

        <View style={styles.grid}>
          {weeks.map((week, wIdx) => (
            <View key={`w_${wIdx}`} style={styles.weekColumn}>
              {week.map((day) => (
                <View
                  key={day.dateStr}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: getCellColor(day.count),
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendLabel: {
    color: Colors.dark.textDisabled,
    fontSize: 10,
  },
  legendBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  scrollArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayLabelColumn: {
    justifyContent: 'space-between',
    height: 102,
    marginRight: 6,
    paddingVertical: 2,
  },
  dayText: {
    color: Colors.dark.textDisabled,
    fontSize: 9,
  },
  grid: {
    flexDirection: 'row',
    gap: 4,
  },
  weekColumn: {
    flexDirection: 'column',
    gap: 4,
  },
  cell: {
    width: 11,
    height: 11,
    borderRadius: 2.5,
  },
});
