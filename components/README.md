# Componentes Reutilizáveis

Este diretório contém componentes reutilizáveis que foram extraídos do projeto para melhorar a manutenibilidade e reduzir duplicação de código.

## Componentes Disponíveis

### 1. AuthLayout
Layout padrão para páginas de autenticação (login e register).

**Props:**
- `children`: Conteúdo da página
- `showLogo`: Boolean para mostrar o logo (padrão: false)
- `headerText`: Texto do header (padrão: "Neuro27")
- `headerHeight`: Altura do header (padrão: 280)

**Uso:**
```tsx
<AuthLayout showLogo={true} headerText="Bem-vindo(a)!" headerHeight={175}>
  {/* Conteúdo da página */}
</AuthLayout>
```

### 2. CustomInput
Input customizado para formulários.

**Props:**
- `marginBottom`: Margem inferior (padrão: 32)
- Todas as props do TextInput nativo

**Uso:**
```tsx
<CustomInput
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  marginBottom={16}
/>
```

### 3. CustomButton
Botão customizado com variantes.

**Props:**
- `title`: Texto do botão
- `variant`: "primary" | "secondary" (padrão: "primary")
- `marginTop`: Margem superior (padrão: 8)
- Todas as props do TouchableOpacity

**Uso:**
```tsx
<CustomButton title="Entrar" onPress={handleLogin} />
<CustomButton title="Cancelar" variant="secondary" onPress={handleCancel} />
```

### 4. ContentCard
Card para exibir conteúdo nas abas (brain, emotions, neurotransmitters).

**Props:**
- `title`: Título do card
- `description`: Descrição do conteúdo
- `onPress`: Função de callback
- `imageContainer`: Componente de imagem opcional

**Uso:**
```tsx
<ContentCard
  title="Dopamina"
  description="Descrição sobre dopamina..."
  onPress={() => router.push('/chapters')}
/>
```

### 5. HeaderCard
Card de header para as abas principais.

**Props:**
- `title`: Título do header
- `height`: Altura do card (padrão: 200)

**Uso:**
```tsx
<HeaderCard title="Cérebro 3D" height={200} />
```

### 6. StoryCard
Card para stories na tela home.

**Props:**
- `name`: Nome do item
- `onPress`: Função de callback
- `circleColor`: Cor do círculo (padrão: "#ABD4FC")

**Uso:**
```tsx
<StoryCard
  name="Dopamina"
  onPress={() => router.push('/chapters')}
  circleColor="#FF6B6B"
/>
```

### 7. EmotionCard
Card para emoções na tela home.

**Props:**
- `name`: Nome da emoção
- `category`: Categoria da emoção
- `onPress`: Função de callback
- `imageColor`: Cor da imagem (padrão: "#ABD4FC")

**Uso:**
```tsx
<EmotionCard
  name="Alegria"
  category="Positiva"
  onPress={() => router.push('/chapters')}
/>
```

### 8. LogoutButton
Botão de logout com ícone.

**Props:**
- `onPress`: Função de callback

**Uso:**
```tsx
<LogoutButton onPress={handleLogout} />
```

## Benefícios da Componentização

1. **Reutilização**: Componentes podem ser usados em múltiplas telas
2. **Manutenibilidade**: Mudanças em um componente se refletem em todos os lugares
3. **Consistência**: Interface uniforme em todo o app
4. **Testabilidade**: Componentes isolados são mais fáceis de testar
5. **Redução de código**: Elimina duplicação de código

## Como Usar

Importe os componentes do arquivo de índice:

```tsx
import { AuthLayout, CustomInput, CustomButton } from '../../components';
```

Ou importe individualmente:

```tsx
import AuthLayout from '../../components/AuthLayout';
```
