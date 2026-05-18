import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'

import { useAuth } from '@/context/AuthContext'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useTheme } from '@/hooks/use-theme'
import { Spacing } from '@/constants/theme'

export default function RegisterScreen() {
  const router = useRouter()
  const theme = useTheme()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'paciente' | 'psicologo'>('paciente')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      await register({ name, email, password, role })
      router.replace('/')
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <ThemedText type="title" style={styles.title}>
        Registrar
      </ThemedText>
      <ThemedText style={styles.subtitle} themeColor="textSecondary">
        Crie sua conta e acesse o app.
      </ThemedText>

      <View style={styles.form}>
        <ThemedText style={styles.label}>Nome</ThemedText>
        <TextInput
          style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
          value={name}
          autoCapitalize="words"
          onChangeText={setName}
        />

        <ThemedText style={styles.label}>E-mail</ThemedText>
        <TextInput
          style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
          value={email}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <ThemedText style={styles.label}>Senha</ThemedText>
        <TextInput
          style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <View style={styles.roleRow}>
          <Pressable
            onPress={() => setRole('paciente')}
            style={[styles.roleButton, role === 'paciente' && { borderColor: theme.text, backgroundColor: theme.backgroundElement }]}
          >
            <ThemedText>Paciente</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setRole('psicologo')}
            style={[styles.roleButton, role === 'psicologo' && { borderColor: theme.text, backgroundColor: theme.backgroundElement }]}
          >
            <ThemedText>Psicólogo</ThemedText>
          </Pressable>
        </View>

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <Pressable style={[styles.submitButton, { backgroundColor: theme.backgroundElement }]} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color={theme.text} /> : <ThemedText>Registrar</ThemedText>}
        </Pressable>

        <Pressable onPress={() => router.push('/login')} style={styles.linkButton}>
          <ThemedText themeColor="textSecondary">Já tem conta? Entre</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'center',
  },
  title: {
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: Spacing.four,
    textAlign: 'center',
  },
  form: {
    gap: Spacing.three,
  },
  label: {
    marginBottom: Spacing.one,
  },
  input: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  roleRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  submitButton: {
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  error: {
    color: '#cc2020',
  },
})
