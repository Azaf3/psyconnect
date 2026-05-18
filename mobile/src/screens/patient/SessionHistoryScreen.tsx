import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

interface Session {
  id: string;
  date: string;
  psychologist: string;
  duration: string;
  specialty: string;
  notes?: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

const mockSessions: Session[] = [
  {
    id: '1',
    date: '15 de Maio, 2026 - 14:00',
    psychologist: 'Dra. Maria Silva',
    duration: '50 min',
    specialty: 'Psicologia Clínica',
    notes: 'Discussão sobre ansiedade e técnicas de relaxamento',
    status: 'completed',
  },
  {
    id: '2',
    date: '8 de Maio, 2026 - 15:30',
    psychologist: 'Dra. Maria Silva',
    duration: '50 min',
    specialty: 'Psicologia Clínica',
    notes: 'Primeira sessão - Avaliação inicial',
    status: 'completed',
  },
  {
    id: '3',
    date: '22 de Maio, 2026 - 10:00',
    psychologist: 'Dra. Maria Silva',
    duration: '50 min',
    specialty: 'Psicologia Clínica',
    status: 'scheduled',
  },
  {
    id: '4',
    date: '25 de Maio, 2026 - 16:00',
    psychologist: 'Dra. Maria Silva',
    duration: '50 min',
    specialty: 'Psicologia Clínica',
    status: 'scheduled',
  },
];

export default function SessionHistoryScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'scheduled':
        return '#2196F3';
      case 'cancelled':
        return '#FF5252';
      default:
        return '#666';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'scheduled':
        return 'Agendada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const renderSessionItem = ({ item }: { item: Session }) => (
    <Pressable
      style={[styles.sessionCard, { backgroundColor: theme.backgroundElement }]}
      onPress={() => setSelectedSession(selectedSession?.id === item.id ? null : item)}
    >
      <View style={styles.sessionHeader}>
        <View style={styles.sessionLeftContent}>
          <ThemedText type="subtitle" numberOfLines={1}>
            {item.psychologist}
          </ThemedText>
          <ThemedText style={styles.specialty} themeColor="textSecondary" numberOfLines={1}>
            {item.specialty}
          </ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <ThemedText style={styles.statusText}>
            {getStatusLabel(item.status)}
          </ThemedText>
        </View>
      </View>

      <View style={[styles.sessionDetails, styles.marginTop]}>
        <View style={styles.detailRow}>
          <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
            📅
          </ThemedText>
          <ThemedText style={styles.detailValue}>{item.date}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
            ⏱️
          </ThemedText>
          <ThemedText style={styles.detailValue}>{item.duration}</ThemedText>
        </View>
      </View>

      {selectedSession?.id === item.id && item.notes && (
        <ThemedView style={[styles.notesSection, styles.marginTop]}>
          <ThemedText style={styles.notesLabel}>Anotações</ThemedText>
          <ThemedText style={styles.notesContent}>{item.notes}</ThemedText>
        </ThemedView>
      )}

      {selectedSession?.id === item.id && (
        <View style={[styles.actionButtons, styles.marginTop]}>
          {item.status === 'completed' && (
            <Pressable
              style={[styles.actionButton, { backgroundColor: theme.backgroundSelected }]}
              onPress={() => {}}
            >
              <ThemedText style={styles.actionButtonText}>Deixar Feedback</ThemedText>
            </Pressable>
          )}
          {item.status === 'scheduled' && (
            <>
              <Pressable
                style={[styles.actionButton, { backgroundColor: theme.backgroundSelected }]}
                onPress={() => {}}
              >
                <ThemedText style={styles.actionButtonText}>Reagendar</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.actionButton, { backgroundColor: '#FF5252' }]}
                onPress={() => {}}
              >
                <ThemedText style={[styles.actionButtonText, { color: 'white' }]}>
                  Cancelar
                </ThemedText>
              </Pressable>
            </>
          )}
        </View>
      )}
    </Pressable>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, contentPlatformStyle]}>
        <ThemedText type="title">Histórico de Sessões</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Ficha clínica e histórico de atendimentos
        </ThemedText>
      </ThemedView>

      {/* Summary Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.summaryScroll}
        contentContainerStyle={styles.summaryContainer}
      >
        <ThemedView type="backgroundElement" style={styles.summaryCard}>
          <ThemedText style={styles.summaryLabel}>Total de Sessões</ThemedText>
          <ThemedText type="subtitle" style={styles.summaryValue}>
            12
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.summaryCard}>
          <ThemedText style={styles.summaryLabel}>Concluídas</ThemedText>
          <ThemedText type="subtitle" style={[styles.summaryValue, { color: '#4CAF50' }]}>
            10
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.summaryCard}>
          <ThemedText style={styles.summaryLabel}>Agendadas</ThemedText>
          <ThemedText type="subtitle" style={[styles.summaryValue, { color: '#2196F3' }]}>
            2
          </ThemedText>
        </ThemedView>
      </ScrollView>

      {/* Session List */}
      <FlatList
        data={mockSessions}
        renderItem={renderSessionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText type="subtitle">Nenhuma sessão registrada</ThemedText>
            <ThemedText themeColor="textSecondary">
              Suas sessões aparecerão aqui
            </ThemedText>
          </ThemedView>
        }
        scrollEnabled={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.one,
  },
  subtitle: {
    fontSize: 13,
  },
  summaryScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  summaryCard: {
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    minWidth: 120,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: Spacing.one,
  },
  summaryValue: {
    fontSize: 20,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  sessionCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sessionLeftContent: {
    flex: 1,
    gap: Spacing.one,
  },
  specialty: {
    fontSize: 12,
  },
  statusBadge: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    marginLeft: Spacing.two,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  marginTop: {
    marginTop: Spacing.two,
  },
  sessionDetails: {
    gap: Spacing.one,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 13,
  },
  notesSection: {
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  notesContent: {
    fontSize: 13,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    gap: Spacing.two,
  },
});
