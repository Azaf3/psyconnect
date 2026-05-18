import React, { useState, useEffect } from 'react';
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

export default function HomeScreen() {
  const { user } = useAuth();
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

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
        {/* Greeting Section */}
        <ThemedView style={styles.greetingSection}>
          <ThemedText type="title">Bem-vindo!</ThemedText>
          <ThemedText type="subtitle" themeColor="textSecondary">
            Olá, {user?.nome}
          </ThemedText>
        </ThemedView>

        {/* Next Session Card */}
        <ThemedView type="backgroundElement" style={styles.sessionCard}>
          <ThemedText type="subtitle">Próxima Sessão</ThemedText>
          <View style={styles.sessionInfo}>
            <ThemedText>Agendada em breve</ThemedText>
            <ThemedText style={styles.sessionSubtext} themeColor="textSecondary">
              Consulte a agenda para mais detalhes
            </ThemedText>
          </View>
          <Pressable
            style={[styles.button, { backgroundColor: theme.backgroundSelected }]}
            onPress={() => {}}
          >
            <ThemedText style={styles.buttonText}>Ver Agenda</ThemedText>
          </Pressable>
        </ThemedView>

        {/* Quick Actions */}
        <ThemedView style={styles.quickActionsSection}>
          <ThemedText type="subtitle">Ações Rápidas</ThemedText>
          <View style={styles.actionsGrid}>
            <Pressable style={[styles.actionCard, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText style={styles.actionIcon}>🔍</ThemedText>
              <ThemedText style={styles.actionLabel}>Buscar Psicólogo</ThemedText>
            </Pressable>
            <Pressable style={[styles.actionCard, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText style={styles.actionIcon}>📋</ThemedText>
              <ThemedText style={styles.actionLabel}>Histórico</ThemedText>
            </Pressable>
          </View>
        </ThemedView>

        {/* Recommended Psychologists */}
        <ThemedView style={styles.recommendedSection}>
          <ThemedText type="subtitle">Psicólogos Recomendados</ThemedText>
          <View style={styles.psychologistList}>
            {[1, 2].map((item) => (
              <Pressable
                key={item}
                style={[styles.psychologistCard, { backgroundColor: theme.backgroundElement }]}
                onPress={() => {}}
              >
                <View style={styles.psychologistContent}>
                  <ThemedText type="subtitle">Dr. Psicólogo {item}</ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.specialty}>
                    Psicologia Clínica
                  </ThemedText>
                  <View style={styles.ratingRow}>
                    <ThemedText>⭐ 4.8</ThemedText>
                    <ThemedText themeColor="textSecondary">(48 avaliações)</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.arrowIcon}>›</ThemedText>
              </Pressable>
            ))}
          </View>
        </ThemedView>

        {/* Tips Section */}
        <ThemedView style={styles.tipsSection}>
          <ThemedText type="subtitle">Dica do Dia</ThemedText>
          <ThemedView type="backgroundElement" style={styles.tipCard}>
            <ThemedText style={styles.tipText}>
              Manter a consistência nas sessões é importante para obter melhores resultados no
              processo terapêutico.
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
  sessionCard: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  sessionInfo: {
    gap: Spacing.one,
  },
  sessionSubtext: {
    fontSize: 12,
  },
  button: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsSection: {
    gap: Spacing.two,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  actionCard: {
    flex: 1,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  recommendedSection: {
    gap: Spacing.two,
  },
  psychologistList: {
    gap: Spacing.two,
  },
  psychologistCard: {
    flexDirection: 'row',
    padding: Spacing.three,
    borderRadius: Spacing.three,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  psychologistContent: {
    flex: 1,
    gap: Spacing.one,
  },
  specialty: {
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: Spacing.one,
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 24,
  },
  tipsSection: {
    gap: Spacing.two,
  },
  tipCard: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  tipText: {
    lineHeight: 20,
  },
});
