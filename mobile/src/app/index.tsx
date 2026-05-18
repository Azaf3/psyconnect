import { Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { useAuth } from '@/context/AuthContext';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Acolhe+ Mobile
          </ThemedText>
        </ThemedView>

        {isAuthenticated ? (
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <ThemedText type="subtitle">Bem-vindo, {user?.nome}</ThemedText>
            <ThemedText themeColor="textSecondary">Você está autenticado.</ThemedText>
            <Pressable style={styles.actionButton} onPress={logout}>
              <ThemedText>Logout</ThemedText>
            </Pressable>
          </ThemedView>
        ) : (
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <ThemedText type="subtitle">Você não está logado</ThemedText>
            <Pressable style={styles.actionButton} onPress={() => router.push('/login')}>
              <ThemedText>Entrar</ThemedText>
            </Pressable>
            <Pressable style={styles.linkButton} onPress={() => router.push('/register')}>
              <ThemedText themeColor="textSecondary">Criar conta</ThemedText>
            </Pressable>
          </ThemedView>
        )}

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  actionButton: {
    marginTop: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
    backgroundColor: '#E0E1E6',
  },
  linkButton: {
    marginTop: Spacing.two,
    alignItems: 'center',
  },
});
