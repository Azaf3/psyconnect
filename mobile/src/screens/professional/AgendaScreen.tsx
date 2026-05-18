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
  time: string;
  patient: string;
  duration: string;
  specialty: string;
  status: 'confirmed' | 'pending' | 'completed';
  notes?: string;
}

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const mockSessions: Session[] = [
  {
    id: '1',
    time: '09:00',
    patient: 'João Silva',
    duration: '50 min',
    specialty: 'Acompanhamento',
    status: 'confirmed',
  },
  {
    id: '2',
    time: '10:00',
    patient: 'Maria Santos',
    duration: '50 min',
    specialty: 'Primeira Avaliação',
    status: 'confirmed',
  },
  {
    id: '3',
    time: '11:00',
    patient: 'Pedro Costa',
    duration: '50 min',
    specialty: 'Acompanhamento',
    status: 'pending',
  },
  {
    id: '4',
    time: '14:00',
    patient: 'Ana Oliveira',
    duration: '50 min',
    specialty: 'Acompanhamento',
    status: 'confirmed',
  },
  {
    id: '5',
    time: '15:00',
    patient: 'Carlos Lima',
    duration: '50 min',
    specialty: 'Acompanhamento',
    status: 'completed',
    notes: 'Sessão realizada com sucesso',
  },
];

export default function AgendaScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState(2); // Quarta
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

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
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'completed':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Realizada';
      default:
        return status;
    }
  };

  const renderSessionItem = ({ item }: { item: Session }) => (
    <Pressable
      style={[styles.sessionCard, { backgroundColor: theme.backgroundElement }]}
      onPress={() => setExpandedSession(expandedSession === item.id ? null : item.id)}
    >
      <View style={styles.sessionHeader}>
        <View style={styles.timeBlock}>
          <ThemedText style={styles.timeText}>{item.time}</ThemedText>
        </View>
        <View style={styles.sessionLeftContent}>
          <ThemedText type="subtitle" numberOfLines={1}>
            {item.patient}
          </ThemedText>
          <ThemedText style={styles.specialty} themeColor="textSecondary">
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

      {expandedSession === item.id && (
        <ThemedView style={[styles.expandedContent, styles.marginTop]}>
          <View style={styles.detailRow}>
            <ThemedText themeColor="textSecondary">Duração:</ThemedText>
            <ThemedText>{item.duration}</ThemedText>
          </View>
          {item.notes && (
            <View style={[styles.detailRow, styles.marginTop]}>
              <ThemedText themeColor="textSecondary">Notas:</ThemedText>
              <ThemedText style={styles.notesText}>{item.notes}</ThemedText>
            </View>
          )}
          <View style={[styles.actionButtons, styles.marginTop]}>
            {item.status === 'pending' && (
              <>
                <Pressable
                  style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                  onPress={() => {}}
                >
                  <ThemedText style={styles.actionButtonText}>Confirmar</ThemedText>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, { backgroundColor: '#FF5252' }]}
                  onPress={() => {}}
                >
                  <ThemedText style={styles.actionButtonText}>Cancelar</ThemedText>
                </Pressable>
              </>
            )}
            {item.status === 'confirmed' && (
              <Pressable
                style={[styles.actionButton, { backgroundColor: theme.backgroundSelected }]}
                onPress={() => {}}
              >
                <ThemedText style={styles.actionButtonText}>Iniciar Sessão</ThemedText>
              </Pressable>
            )}
            {item.status === 'completed' && (
              <Pressable
                style={[styles.actionButton, { backgroundColor: theme.backgroundSelected }]}
                onPress={() => {}}
              >
                <ThemedText style={styles.actionButtonText}>Ver Resumo</ThemedText>
              </Pressable>
            )}
          </View>
        </ThemedView>
      )}
    </Pressable>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, contentPlatformStyle]}>
        <ThemedText type="title">Agenda</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Suas sessões agendadas
        </ThemedText>
      </ThemedView>

      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysScroll}
        contentContainerStyle={styles.daysContainer}
      >
        {daysOfWeek.map((day, idx) => (
          <Pressable
            key={day}
            onPress={() => setSelectedDay(idx)}
            style={[
              styles.dayButton,
              selectedDay === idx
                ? { backgroundColor: theme.text }
                : { backgroundColor: theme.backgroundElement },
            ]}
          >
            <ThemedText
              style={[
                styles.dayText,
                selectedDay === idx && { color: theme.background },
              ]}
            >
              {day}
            </ThemedText>
            <ThemedText
              style={[
                styles.dateNumber,
                selectedDay === idx && { color: theme.background },
              ]}
            >
              {18 + idx}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Sessions List */}
      <FlatList
        data={mockSessions}
        renderItem={renderSessionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText type="subtitle">Nenhuma sessão agendada</ThemedText>
            <ThemedText themeColor="textSecondary">Neste dia</ThemedText>
          </ThemedView>
        }
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
  daysScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  daysContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  dayButton: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    gap: Spacing.one,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateNumber: {
    fontSize: 14,
    fontWeight: 'bold',
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
    alignItems: 'center',
    gap: Spacing.two,
  },
  timeBlock: {
    backgroundColor: '#f0f0f0',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    minWidth: 50,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
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
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  marginTop: {
    marginTop: Spacing.two,
  },
  expandedContent: {
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: Spacing.two,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notesText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 13,
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
    color: 'white',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    gap: Spacing.two,
  },
});
