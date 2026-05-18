import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useSecureStorage = (key) => key === 'acolhe-auth-token'

export async function getItem(key) {
  if (useSecureStorage(key)) {
    return await SecureStore.getItemAsync(key)
  }
  return await AsyncStorage.getItem(key)
}

export async function setItem(key, value) {
  if (useSecureStorage(key)) {
    await SecureStore.setItemAsync(key, value)
    return
  }
  await AsyncStorage.setItem(key, value)
}

export async function removeItem(key) {
  if (useSecureStorage(key)) {
    await SecureStore.deleteItemAsync(key)
    return
  }
  await AsyncStorage.removeItem(key)
}
