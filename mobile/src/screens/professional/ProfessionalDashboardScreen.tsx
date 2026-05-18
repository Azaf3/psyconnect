import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function ProfessionalDashboardScreen() {
  const { user } = useAuth();
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
    >
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.greetingSection}>
          <ThemedText type="title">Dashboard</ThemedText>
          <ThemedText type="subtitle" themeColor="textSecondary">
            Olá, Dra./Dr. {user?.nome}
          </ThemedText>
        </ThemedView>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <ThemedView type="backgroundElement" style={styles.metricCard}>
            <ThemedText themeColor="textSecondary" style={styles.metricLabel}>
              Pacientes Ativos
            </ThemedText>
            <ThemedText type="subtitle" style={[styles.metricValue, { color: '#2196F3' }]}>
              24
            </ThemedText>
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.metricCard}>
            <ThemedText themeColor="textSecondary" style={styles.metricLabel}>
              Sessões Esta Semana
            </ThemedText>
            <ThemedText type="subtitle" style={[styles.metricValue, { color: '#4CAF50' }]}>
              12
            </ThemedText>
          </ThemedView>
        </View>

        <View style={styles.metricsGrid}>
          <ThemedView type="backgroundElement" style={styles.metricCard}>
            <ThemedText themeColor="textSecondary" style={styles.metricLabel}>
              Taxa de Comparecimento
            </ThemedText>
            <ThemedText type="subtitle" style={[styles.metricValue, { color: '#FF9800' }]}>
              95%
            </ThemedText>
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.metricCard}>
            <ThemedText themeColor="textSecondary" style={styles.metricLabel}>
              Avaliação Média
            </ThemedText>
            <ThemedText type="subtitle" style={[styles.metricValue, { color: '#F44336' }]}>
              4.9⭐
            </ThemedText>
          </ThemedView>
        </View>

        {/* Próximas Sessões */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Próximas Sessões</ThemedText>
          <View style={styles.sessionsList}>
            {[
              { time: '10:00', patient: 'João Silva', duration: '50 min' },
              { time: '11:00', patient: 'Maria Santos', duration: '50 min' },
              { time: '14:00', patient: 'Ana Costa', duration: '50 min' },
            ].map((session, idx) => (
              <ThemedView
                key={idx}
                type="backgroundElement"
                style={styles.sessionItem}
              >
                <View style={styles.sessionTime}>
                  <ThemedText type="subtitle">{session.time}</ThemedText>
                </View>
                <View style={styles.sessionInfo}>
                  <ThemedText>{session.patient}</ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.duration}>
                    {session.duration}
                  </ThemedText>
                </View>
                <Pressable
                  style={[styles.actionIcon, { backgroundColor: theme.backgroundSelected }]}
                  onPress={() => {}}
                >
                  <ThemedText>›</ThemedText>
                </Pressable>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        {/* Quick Actions */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Ações Rápidas</ThemedText>
          <View style={styles.actionsGrid}>
            <Pressable
              style={[styles.actionCard, { backgroundColor: theme.backgroundElement }]}
              onPress={() => {}}
            >
              <ThemedText style={styles.actionIcon}>📋</ThemedText>
              <ThemedText style={styles.actionLabel}>Novas Solicitações</ThemedText>
              <ThemedText style={styles.badge}>2</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.actionCard, { backgroundColor: theme.backgroundElement }]}
              onPress={() => {}}
            >
              <ThemedText style={styles.actionIcon}>📝</ThemedText>
              <ThemedText style={styles.actionLabel}>Documentos</ThemedText>
            </Pressable>
          </View>
        </ThemedView>

        {/* Alerts/Reminders */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Lembretes</ThemedText>
          <ThemedView type="backgroundElement" style={styles.reminderCard}>
            <ThemedText style={styles.reminderIcon}>⚠️</ThemedText>
            <ThemedText style={styles.reminderText}>
              Você tem 3 pacientes para acompanhamento de tratamento
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.five,
  },
  greetingSection: {
    gap: Spacing.one,
    paddingTop: Spacing.three,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  metricCard: {
    flex: 1,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  metricLabel: {
    fontSize: 12,
  },
  metricValue: {
    fontSize: 20,
  },
  section: {
    gap: Spacing.two,
  },
  sessionsList: {
    gap: Spacing.two,
  },
  sessionItem: {
    flexDirection: 'row',
    padding: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two,
  },
  sessionTime: {
    minWidth: 50,
  },
  sessionInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  duration: {
    fontSize: 12,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  actionCard: {
    flex: 1,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two,
  },
  actionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  badge: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5252',
  },
  reminderCard: {
    flexDirection: 'row',
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
  },
  reminderIcon: {
    fontSize: 20,
  },
  reminderText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
