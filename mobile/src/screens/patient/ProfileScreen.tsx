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

export default function ProfileScreen() {
  const { user, logout, updateUser } = useAuth();
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
            <ThemedText type="title">{user?.nome}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.email}>
              {user?.email}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Personal Information Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Informações Pessoais
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                Nome:
              </ThemedText>
              <ThemedText style={styles.infoValue}>{user?.nome}</ThemedText>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                Email:
              </ThemedText>
              <ThemedText style={styles.infoValue}>{user?.email}</ThemedText>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <ThemedText themeColor="textSecondary" style={styles.infoLabel}>
                Tipo de Conta:
              </ThemedText>
              <ThemedText style={styles.infoValue}>Paciente</ThemedText>
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

        {/* Session History */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Meu Histórico
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.historyCard}>
            <View style={styles.historyItem}>
              <ThemedText style={styles.historyLabel}>Total de Sessões</ThemedText>
              <ThemedText type="subtitle" style={styles.historyValue}>
                12
              </ThemedText>
            </View>
            <View style={[styles.historyItem, styles.borderTop]}>
              <ThemedText style={styles.historyLabel}>Próxima Sessão</ThemedText>
              <ThemedText type="subtitle" style={styles.historyValue}>
                Em breve
              </ThemedText>
            </View>
            <View style={[styles.historyItem, styles.borderTop]}>
              <ThemedText style={styles.historyLabel}>Psicólogo Atual</ThemedText>
              <ThemedText type="subtitle" style={styles.historyValue}>
                Dra. Maria Silva
              </ThemedText>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Settings Section */}
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
              <ThemedText>Privacidade e Segurança</ThemedText>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.settingItem, { backgroundColor: theme.backgroundElement, marginTop: Spacing.two }]}
              onPress={() => {}}
            >
              <ThemedText>Termos de Serviço</ThemedText>
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
  historyCard: {
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  historyItem: {
    paddingVertical: Spacing.two,
  },
  historyLabel: {
    fontSize: 13,
    marginBottom: Spacing.one,
  },
  historyValue: {
    fontSize: 16,
  },
  settingsGroup: {
    gap: Spacing.one,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  arrow: {
    fontSize: 20,
  },
  button: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  buttonText: {
    fontWeight: '600',
  },
  logoutButton: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    marginVertical: Spacing.three,
  },
  logoutText: {
    fontWeight: '600',
    color: 'white',
  },
});
