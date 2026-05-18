# Arquitetura de Navegação - PsyConnect Mobile

## Visão Geral

A navegação do aplicativo móvel PsyConnect foi refatorada para usar uma arquitetura em camadas com proteção de telas privadas baseada em autenticação e role.

## Estrutura de Navegadores

```
RootNavigator (StackNavigator)
├── AuthStack (sem autenticação)
│   ├── Login
│   └── Register
└── AppStack (autenticado)
    ├── PatientTabs (BottomTabNavigator - role: paciente)
    │   ├── Home
    │   ├── Explore
    │   └── Profile
    └── ProfessionalTabs (BottomTabNavigator - role: profissional)
        ├── Dashboard
        ├── Patients
        └── Profile
```

## Componentes Principais

### `RootNavigator.tsx`
- **Responsabilidade**: Controlar a navegação raiz entre autenticação e aplicação
- **Fluxo**:
  1. Verifica se usuário está autenticado (`useAuth().isAuthenticated`)
  2. Se não autenticado → exibe `AuthStack`
  3. Se autenticado → exibe `AppStack`
  4. Durante carregamento → exibe spinner

### `AuthStack.tsx`
- **Responsabilidade**: Gerenciar telas públicas (sem autenticação)
- **Telas**: Login, Register
- **Nota**: Atualmente tem placeholders; integrar com telas existentes em `src/app/`

### `AppStack.tsx`
- **Responsabilidade**: Gerenciar telas privadas (autenticadas)
- **Fluxo**:
  1. Verifica `user.role` do contexto de autenticação
  2. Se role === 'profissional' → exibe `ProfessionalTabs`
  3. Senão → exibe `PatientTabs`

### `PatientTabs.tsx`
- **Responsabilidade**: BottomTabNavigator para usuários pacientes
- **Tabs**: 
  - **Home** (Início) - tela principal
  - **Explore** (Explorar) - exploração de conteúdo
  - **Profile** (Perfil) - perfil do usuário
- **Styling**: Usa cores do tema (light/dark mode)

### `ProfessionalTabs.tsx`
- **Responsabilidade**: BottomTabNavigator para usuários profissionais
- **Tabs**:
  - **Dashboard** - painel de controle
  - **Patients** (Pacientes) - gerenciamento de pacientes
  - **Profile** (Perfil) - perfil profissional
- **Styling**: Usa cores do tema (light/dark mode)

## Contexto de Autenticação

O `AuthContext` (em `shared/AuthContext.jsx`) fornece:

```typescript
interface AuthContextValue {
  user: {
    id: string;
    nome: string;
    email: string;
    role: 'paciente' | 'profissional';
    profissional?: any;
  } | null;
  loading: boolean;
  isAuthenticated: boolean;
  login(credentials): Promise<user>;
  logout(): Promise<void>;
  register(data): Promise<user>;
  updateUser(patch): void;
}
```

## Proteção de Telas

1. **RootNavigator**: Protege toda a aplicação
   - Se não autenticado → bloqueia acesso a `AppStack`
   
2. **AppStack**: Protege telas por role
   - Se profissional → mostra apenas `ProfessionalTabs`
   - Se paciente → mostra apenas `PatientTabs`

3. **AuthContext Loading**: 
   - Durante carregamento inicial → mostra `ActivityIndicator`
   - Garante que dados de autenticação estejam carregados antes de renderizar navegação

## Integração com Telas Existentes

As telas placeholder em PatientTabs e ProfessionalTabs devem ser importadas/ligadas a:

- **Home**: `src/app/index.tsx`
- **Explore**: `src/app/explore.tsx`
- **Profile**: Criar nova tela ou adaptar existente
- **Dashboard**: Criar nova tela para profissionais
- **Patients**: Criar nova tela para profissionais

## Fluxo de Autenticação Completo

```
Abertura do App
    ↓
RootNavigator verifica isAuthenticated
    ↓
    ├─ true → AppStack
    │   ↓
    │   AppStack verifica user.role
    │   ↓
    │   ├─ 'profissional' → ProfessionalTabs
    │   └─ 'paciente' → PatientTabs
    │
    └─ false → AuthStack
        ↓
        Login/Register
        ↓
        useAuth().login() ou useAuth().register()
        ↓
        Transição automática para AppStack
```

## Alterações na Estrutura

### Novo Diretório
- `src/navigation/` - contém todos os navigators

### Arquivos Criados
- `src/navigation/RootNavigator.tsx`
- `src/navigation/AuthStack.tsx`
- `src/navigation/AppStack.tsx`
- `src/navigation/PatientTabs.tsx`
- `src/navigation/ProfessionalTabs.tsx`

### Arquivos Modificados
- `src/app/_layout.tsx` - integra `RootNavigator`

### Arquivo Preservado (não usado mais na navegação)
- `src/components/app-tabs.tsx` - pode ser removido ou reutilizado

## Como Adicionar Novas Telas

### Para PatientTabs
1. Criar novo arquivo em `src/app/` ou `src/components/screens/`
2. Adicionar um novo `<Tab.Screen>` em `PatientTabs.tsx`
3. Importar e referenciar o componente

### Para ProfessionalTabs
1. Criar novo arquivo em `src/app/` ou `src/components/screens/`
2. Adicionar um novo `<Tab.Screen>` em `ProfessionalTabs.tsx`
3. Importar e referenciar o componente

### Para AuthStack
1. Criar novo arquivo (ex: PasswordReset)
2. Adicionar um novo `<Stack.Screen>` em `AuthStack.tsx`

## Próximos Passos

1. **Linkar telas reais**
   - Implementar telas concretas para Dashboard, Patients, Profile profissional
   - Linkar Home e Explore existentes ao BottomTabNavigator

2. **Testes**
   - Validar fluxo de login → autenticação → navegação
   - Testar logout → retorno para AuthStack
   - Validar alternância entre roles

3. **Adicionar modal/stack aninhadas** (opcional)
   - Stack para detalhe de paciente dentro de ProfessionalTabs
   - Modal de edição de perfil dentro de tabs

## Notas Técnicas

- **NavigationContainer**: Adicionado em `_layout.tsx` para prover contexto de navegação
- **TypeScript**: Tipos de rota definidos em cada navigator para type-safety
- **Theme-aware**: Cores adaptam-se a light/dark mode usando `useColorScheme()`
- **No Expo Router**: A navegação manual foi preferida sobre Expo Router para mais controle
