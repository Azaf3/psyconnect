import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  lastSession: string;
  nextSession: string;
  status: 'active' | 'paused' | 'completed';
  treatmentDuration: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'João Silva',
    age: 32,
    diagnosis: 'Ansiedade',
    lastSession: '15/05/2026',
    nextSession: '22/05/2026',
    status: 'active',
    treatmentDuration: '6 meses',
  },
  {
    id: '2',
    name: 'Maria Santos',
    age: 28,
    diagnosis: 'Depressão',
    lastSession: '14/05/2026',
    nextSession: '21/05/2026',
    status: 'active',
    treatmentDuration: '3 meses',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    age: 45,
    diagnosis: 'Transtorno de Sono',
    lastSession: '13/05/2026',
    nextSession: '20/05/2026',
    status: 'active',
    treatmentDuration: '2 meses',
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    age: 35,
    diagnosis: 'Relacionamento',
    lastSession: '10/05/2026',
    nextSession: 'A agendar',
    status: 'paused',
    treatmentDuration: '4 meses',
  },
  {
    id: '5',
    name: 'Carlos Lima',
    age: 50,
    diagnosis: 'Burnout Profissional',
    lastSession: '08/05/2026',
    nextSession: '-',
    status: 'completed',
    treatmentDuration: '1 mês',
  },
];

export default function PatientsListScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'paused' | 'completed'>('all');
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
      case 'active':
        return '#4CAF50';
      case 'paused':
        return '#FF9800';
      case 'completed':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'paused':
        return 'Pausado';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <Pressable
      style={[styles.patientCard, { backgroundColor: theme.backgroundElement }]}
      onPress={() => setExpandedPatient(expandedPatient === item.id ? null : item.id)}
    >
      <View style={styles.patientHeader}>
        <View style={styles.patientAvatar}>
          <ThemedText style={styles.avatarText}>
            {item.name.charAt(0)}
          </ThemedText>
        </View>
        <View style={styles.patientInfo}>
          <ThemedText type="subtitle" numberOfLines={1}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.diagnosis} themeColor="textSecondary">
            {item.diagnosis}
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

      {expandedPatient === item.id && (
        <ThemedView style={[styles.expandedContent, styles.marginTop]}>
          <View style={styles.detailRow}>
            <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
              Idade:
            </ThemedText>
            <ThemedText>{item.age} anos</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
              Tratamento:
            </ThemedText>
            <ThemedText>{item.treatmentDuration}</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
              Última Sessão:
            </ThemedText>
            <ThemedText>{item.lastSession}</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
              Próxima:
            </ThemedText>
            <ThemedText>{item.nextSession}</ThemedText>
          </View>

          <View style={[styles.actionButtons, styles.marginTop]}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
              onPress={() => {}}
            >
              <ThemedText style={styles.actionButtonText}>Ficha</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.actionButton, { backgroundColor: theme.backgroundSelected }]}
              onPress={() => {}}
            >
              <ThemedText style={styles.actionButtonText}>Contato</ThemedText>
            </Pressable>
            {item.status === 'active' && (
              <Pressable
                style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
                onPress={() => {}}
              >
                <ThemedText style={styles.actionButtonText}>Pausar</ThemedText>
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
        <ThemedText type="title">Pacientes</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Total: {mockPatients.length} pacientes
        </ThemedText>
      </ThemedView>

      {/* Search */}
      <ThemedView style={[styles.searchContainer, contentPlatformStyle]}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: theme.backgroundElement, color: theme.text }]}
          placeholder="Buscar paciente..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContainer}
      >
        {(['all', 'active', 'paused', 'completed'] as const).map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterButton,
              selectedFilter === filter
                ? { backgroundColor: theme.text }
                : { backgroundColor: theme.backgroundElement },
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                selectedFilter === filter && { color: theme.background },
              ]}
            >
              {filter === 'all' ? 'Todos' : filter === 'active' ? 'Ativos' : filter === 'paused' ? 'Pausados' : 'Concluídos'}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Patients List */}
      <FlatList
        data={filteredPatients}
        renderItem={renderPatientItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText type="subtitle">Nenhum paciente encontrado</ThemedText>
            <ThemedText themeColor="textSecondary">
              Tente uma busca diferente
            </ThemedText>
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
  searchContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  searchInput: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
  },
  filtersScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filtersContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  filterButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  patientCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  patientInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  diagnosis: {
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
    gap: Spacing.one,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
  },
  detailLabel: {
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
