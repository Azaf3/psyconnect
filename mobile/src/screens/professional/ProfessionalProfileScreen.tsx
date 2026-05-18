import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function ProfessionalProfileScreen() {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleLogout = async () => {
    Alert.alert('Logout', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
    >
      <ThemedView style={styles.container}>
        {/* Profile Header */}
        <ThemedView style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={styles.avatarText}>
              {user?.nome?.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
          <View style={styles.userInfo}>
            <ThemedText type="title">Dra./Dr. {user?.nome}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.email}>
              {user?.email}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Professional Information */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Informações Profissionais
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                CRP:
              </ThemedText>
              <ThemedText style={styles.infoValue}>06/12345</ThemedText>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                Especialidade:
              </ThemedText>
              <ThemedText style={styles.infoValue}>Psicologia Clínica</ThemedText>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                Cidade:
              </ThemedText>
              <ThemedText style={styles.infoValue}>São Paulo, SP</ThemedText>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                Avaliação:
              </ThemedText>
              <ThemedText style={styles.infoValue}>4.9⭐ (156 avaliações)</ThemedText>
            </View>
          </ThemedView>
          <Pressable
            style={[styles.button, { backgroundColor: theme.backgroundSelected }]}
            onPress={() => setIsEditing(!isEditing)}
          >
            <ThemedText style={styles.buttonText}>
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Statistics */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Estatísticas
          </ThemedText>
          <View style={styles.statsGrid}>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Pacientes Ativos
              </ThemedText>
              <ThemedText type="subtitle" style={styles.statValue}>
                24
              </ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Horas/Mês
              </ThemedText>
              <ThemedText type="subtitle" style={styles.statValue}>
                120h
              </ThemedText>
            </ThemedView>
          </View>
          <View style={styles.statsGrid}>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Taxa de Retorno
              </ThemedText>
              <ThemedText type="subtitle" style={styles.statValue}>
                92%
              </ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Meses de Atuação
              </ThemedText>
              <ThemedText type="subtitle" style={styles.statValue}>
                24m
              </ThemedText>
            </ThemedView>
          </View>
        </ThemedView>

        {/* Availability */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Disponibilidade
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.availabilityCard}>
            <View style={styles.availabilityRow}>
              <ThemedText>Segunda a Sexta</ThemedText>
              <ThemedText style={styles.time}>09:00 - 18:00</ThemedText>
            </View>
            <View style={[styles.availabilityRow, styles.borderTop]}>
              <ThemedText>Sábado</ThemedText>
              <ThemedText style={styles.time}>09:00 - 12:00</ThemedText>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Settings */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Configurações
          </ThemedText>
          <View style={styles.settingsGroup}>
            <Pressable
              style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}
              onPress={() => {}}
            >
              <ThemedText>Notificações</ThemedText>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.settingItem, { backgroundColor: theme.backgroundElement, marginTop: Spacing.two }]}
              onPress={() => {}}
            >
              <ThemedText>Documento & Certificados</ThemedText>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.settingItem, { backgroundColor: theme.backgroundElement, marginTop: Spacing.two }]}
              onPress={() => {}}
            >
              <ThemedText>Privacidade e Segurança</ThemedText>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.settingItem, { backgroundColor: theme.backgroundElement, marginTop: Spacing.two }]}
              onPress={() => {}}
            >
              <ThemedText>Suporte</ThemedText>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
          </View>
        </ThemedView>

        {/* Logout Button */}
        <Pressable
          style={[styles.logoutButton, { backgroundColor: '#cc2020' }]}
          onPress={handleLogout}
        >
          <ThemedText style={styles.logoutText}>Sair da Conta</ThemedText>
        </Pressable>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  email: {
    fontSize: 13,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 16,
  },
  infoCard: {
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 13,
  },
  infoValue: {
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statCard: {
    flex: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 18,
  },
  availabilityCard: {
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  time: {
    fontWeight: '600',
  },
  settingsGroup: {
    gap: Spacing.one,
  },
});
