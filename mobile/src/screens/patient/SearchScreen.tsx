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

interface Psychologist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  availability: string;
  price: string;
  image?: string;
}

const mockPsychologists: Psychologist[] = [
  {
    id: '1',
    name: 'Dra. Maria Silva',
    specialty: 'Psicologia Clínica',
    rating: 4.9,
    reviews: 56,
    availability: 'Seg-Sex 9h-18h',
    price: 'R$ 150/sessão',
  },
  {
    id: '2',
    name: 'Dr. João Santos',
    specialty: 'Terapia Cognitivo-Comportamental',
    rating: 4.7,
    reviews: 42,
    availability: 'Seg-Sab 10h-19h',
    price: 'R$ 120/sessão',
  },
  {
    id: '3',
    name: 'Dra. Ana Costa',
    specialty: 'Psicodrama',
    rating: 4.8,
    reviews: 38,
    availability: 'Ter-Qui 14h-20h',
    price: 'R$ 140/sessão',
  },
  {
    id: '4',
    name: 'Dr. Carlos Oliveira',
    specialty: 'Psicologia do Esporte',
    rating: 4.6,
    reviews: 29,
    availability: 'Seg-Sex 7h-17h',
    price: 'R$ 130/sessão',
  },
];

export default function SearchScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const filteredPsychologists = mockPsychologists.filter((psy) => {
    const matchesSearch =
      psy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      psy.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const renderPsychologist = ({ item }: { item: Psychologist }) => (
    <Pressable
      style={[styles.psychologistCard, { backgroundColor: theme.backgroundElement }]}
      onPress={() => {}}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <ThemedText type="subtitle" numberOfLines={1}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.specialty} themeColor="textSecondary" numberOfLines={1}>
            {item.specialty}
          </ThemedText>
        </View>
        <ThemedText style={styles.price}>{item.price}</ThemedText>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.ratingRow}>
          <ThemedText>⭐ {item.rating}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.reviews}>
            ({item.reviews})
          </ThemedText>
        </View>
        <ThemedText style={styles.availability} themeColor="textSecondary">
          {item.availability}
        </ThemedText>
      </View>

      <Pressable
        style={[styles.actionButton, { backgroundColor: theme.backgroundSelected }]}
        onPress={() => {}}
      >
        <ThemedText style={styles.buttonText}>Agendar Sessão</ThemedText>
      </Pressable>
    </Pressable>
  );

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
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, contentPlatformStyle]}>
        <ThemedText type="title">Buscar Psicólogo</ThemedText>
        <ThemedView style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: theme.backgroundElement, color: theme.text }]}
            placeholder="Buscar por nome ou especialidade..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </ThemedView>
      </ThemedView>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContainer}
      >
        {['Todos', 'Clínica', 'TCC', 'Esporte', 'Infantil'].map((filter) => (
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
              {filter}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results */}
      <FlatList
        data={filteredPsychologists}
        renderItem={renderPsychologist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, contentPlatformStyle]}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText type="subtitle">Nenhum psicólogo encontrado</ThemedText>
            <ThemedText themeColor="textSecondary">
              Tente uma busca diferente ou mude os filtros
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
    gap: Spacing.three,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
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
  psychologistCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  specialty: {
    fontSize: 12,
  },
  price: {
    fontWeight: '600',
    marginLeft: Spacing.two,
  },
  cardDetails: {
    gap: Spacing.one,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  reviews: {
    fontSize: 12,
  },
  availability: {
    fontSize: 12,
  },
  actionButton: {
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
    gap: Spacing.two,
  },
});
