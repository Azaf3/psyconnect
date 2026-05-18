import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import PatientTabs from './PatientTabs';
import ProfessionalTabs from './ProfessionalTabs';

const Stack = createNativeStackNavigator();

type AppStackParamList = {
  PatientTabs: undefined;
  ProfessionalTabs: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

export default function AppStack() {
  const { user } = useAuth();

  const isProfessional = user?.role === 'profissional';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isProfessional ? (
        <Stack.Screen 
          name="ProfessionalTabs" 
          component={ProfessionalTabs}
        />
      ) : (
        <Stack.Screen 
          name="PatientTabs" 
          component={PatientTabs}
        />
      )}
    </Stack.Navigator>
  );
}
