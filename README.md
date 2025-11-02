# 🧠 Neuro27

O **Neuro27** é um aplicativo mobile interativo desenvolvido em **React Native** que explica como os neurotransmissores agem no cérebro e influenciam as emoções humanas. Ele combina **conteúdos educativos**, **visualizações dinâmicas** e **recursos interativos** para tornar o aprendizado de neurociência mais acessível e envolvente.

O nosso **objetivo** é democratizar o ensino neurocientífico e promover a alfabetização emocional dos nossos usuários através de uma experiência de aprendizado moderna e intuitiva.

<p align="center">
  <img width="600" height="400" alt="Neuro27 App Preview" src="https://github.com/user-attachments/assets/6603fc15-f901-4248-bc4c-b9ac76d31edb" />
</p>

## 📱 Sobre o Projeto

O Neuro27 é uma aplicação educacional que explora a complexa relação entre neurociência e emoções humanas. O app oferece uma jornada de aprendizado estruturada através de capítulos interativos, permitindo que os usuários compreendam:

- **Neurotransmissores**: Dopamina, Serotonina, Acetilcolina, Adrenalina, GABA e Glutamato
- **Emoções**: Alegria, Tristeza, Raiva, Medo e Amor
- **Partes do Cérebro**: Sistema Límbico, Amígdala, Hipocampo e outras estruturas importantes
- **Associações**: Como neurotransmissores, emoções e estruturas cerebrais se relacionam

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Login e Cadastro** seguros com Firebase Authentication
- **Recuperação de senha** com código de verificação por email
- **Perfil do usuário** personalizável com foto e informações

### 📚 Conteúdo Educacional
- **Capítulos estruturados** organizados por categorias
- **Progresso salvo** automaticamente para cada usuário
- **Sistema de favoritos** para marcar conteúdo importante
- **Navegação intuitiva** entre diferentes seções

### 🎨 Interface Interativa
- **Visualizações dinâmicas** do cérebro e suas estruturas
- **Cards informativos** com descrições detalhadas
- **Sistema de associações** mostrando conexões entre conceitos
- **Design responsivo** otimizado para diferentes tamanhos de tela

### 🧭 Navegação Intuitiva
- **Drawer Navigation** para acesso rápido às seções principais
- **Tab Navigation** para navegação entre funcionalidades
- **Deep linking** para compartilhamento de conteúdo específico

## 🚀 Tecnologias e Ferramentas

<div align="center">
  <!-- Frontend -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnative/reactnative-original.svg" height="50" alt="React Native" />
<img src="https://img.icons8.com/?color=FFFFFF&format=png&id=7ImWFDcPfSlz&size=100" height="50" alt="Expo" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="50" alt="TypeScript" />
  
  <!-- Backend & Services -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" height="50" alt="Firebase" />
  
  <!-- Design & Development -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" height="50" alt="Figma" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" height="50" alt="Visual Studio Code"/>
</div>

### Stack Principal
- **React Native 0.79.3** - Framework para desenvolvimento mobile
- **Expo SDK 53** - Plataforma para desenvolvimento e deploy
- **TypeScript 5.8.3** - Tipagem estática para JavaScript
- **Firebase 11.10.0** - Backend-as-a-Service para autenticação e dados
- **Expo Router 5.0.6** - Roteamento baseado em arquivos

### Bibliotecas e Dependências
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Navigation** - Navegação entre telas
- **Lucide React Native** - Ícones modernos
- **React Native SVG** - Renderização de gráficos vetoriais
- **Expo Image** - Otimização de imagens
- **AsyncStorage** - Armazenamento local

## 📂 Estrutura do Projeto

```
Neuro27/
├── 📱 app/                          # Código-fonte principal do app
│   ├── (drawer)/                    # Páginas com navegação drawer
│   │   ├── _layout.tsx              # Layout do drawer navigation
│   │   ├── brain.tsx                # Informações sobre partes do cérebro
│   │   ├── emotions.tsx             # Seção de emoções
│   │   ├── home.tsx                 # Tela inicial principal
│   │   ├── neurotransmitters.tsx   # Detalhes dos neurotransmissores
│   │   ├── profile.tsx              # Perfil do usuário
│   │   └── saved.tsx                # Conteúdo salvo/favoritos
│   │
│   ├── (panel)/                     # Páginas de autenticação
│   │   ├── _layout.tsx              # Layout para telas do painel
│   │   ├── ForgotPasswordEmail.tsx  # Recuperação de senha
│   │   ├── login.tsx                # Tela de login
│   │   ├── outset.tsx               # Tela inicial/introdução
│   │   └── register.tsx             # Tela de registro
│   │
│   ├── chapter-content.tsx          # Visualizador de conteúdo dos capítulos
│   ├── chapters.tsx                 # Lista de capítulos por categoria
│   ├── edit-profile.tsx             # Edição de perfil
│   ├── edit-profilePassword.tsx     # Alteração de senha
│   ├── index.tsx                    # Ponto de entrada do app
│   └── _layout.tsx                  # Layout raiz da aplicação
│
├── 🎨 assets/                       # Recursos estáticos
│   └── images/                      # Imagens, ícones e ilustrações
│       ├── anonymus.jpg             # Avatar padrão
│       ├── dopamin.png              # Ilustração da dopamina
│       ├── serotonin.png            # Ilustração da serotonina
│       ├── logo.png                 # Logo do aplicativo
│       └── ...                      # Outras imagens
│
├── 🧩 components/                   # Componentes reutilizáveis
│   ├── AuthLayout.tsx               # Layout para páginas de autenticação
│   ├── BrainPartCard.tsx            # Card para partes do cérebro
│   ├── ChapterCompleteButton.tsx    # Botão de conclusão de capítulo
│   ├── ContentCard.tsx              # Card genérico de conteúdo
│   ├── CustomInput.tsx              # Input customizado
│   ├── EmotionCard.tsx              # Card para emoções
│   ├── NeurotransmitterCard.tsx     # Card para neurotransmissores
│   ├── StoryCard.tsx                # Card para stories
│   └── ...                          # Outros componentes
│
├── 📋 constants/                    # Constantes globais
│   ├── associations.ts              # Associações entre conceitos
│   ├── auth.ts                      # Configurações de autenticação
│   ├── chapter-content.ts           # Conteúdo dos capítulos
│   ├── chapters.ts                  # Estrutura dos capítulos
│   ├── colors.ts                    # Paleta de cores do app
│   ├── firebase.ts                  # Configuração do Firebase
│   ├── fonts.ts                     # Configuração de fontes
│   └── validation.ts                # Schemas de validação
│
├── 🔄 contexts/                     # Contextos React
│   ├── ChapterProgressContext.tsx   # Contexto de progresso dos capítulos
│   └── SavedChaptersContext.tsx     # Contexto de capítulos salvos
│
├── 🎣 hooks/                        # Hooks customizados
│   └── useChapterProgress.ts        # Hook para gerenciar progresso
│
├── 📝 types/                        # Definições de tipos TypeScript
│   └── images.d.ts                  # Tipos para importação de imagens
│
├── 📄 Configurações
│   ├── app.json                     # Configuração do Expo
│   ├── package.json                 # Dependências e scripts
│   ├── tsconfig.json                # Configuração do TypeScript
│   ├── eslint.config.js             # Configuração do ESLint
│   └── README.md                    # Documentação principal
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Conta no Firebase** para autenticação
- **Expo Go** app no seu dispositivo móvel (para testes)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/Neuro27.git
   cd Neuro27
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative a autenticação por email/senha
   - Copie as configurações do Firebase para `constants/firebase.ts`

4. **Execute o projeto**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Teste no dispositivo**
   - Escaneie o QR code com o Expo Go
   - Ou execute em simulador: `npm run ios` / `npm run android`

## 📱 Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia o servidor de desenvolvimento
npm run android        # Executa no Android
npm run ios           # Executa no iOS
npm run web           # Executa na web

# Qualidade de código
npm run lint          # Executa o linter
npm run reset-project # Reseta configurações do projeto
```

## 🎯 Funcionalidades Detalhadas

### Sistema de Capítulos
O app organiza o conteúdo em três categorias principais:

#### 🧠 Neurotransmissores
- **Introdução**: Conceitos básicos sobre neurotransmissores
- **Dopamina**: Recompensa, motivação e comportamento
- **Serotonina**: Humor, sono e regulação emocional
- **Acetilcolina**: Memória e aprendizado
- **Adrenalina**: Resposta ao estresse e excitação
- **GABA**: Inibição neural e relaxamento
- **Glutamato**: Excitação neural e plasticidade

#### 😊 Emoções
- **Introdução**: O que são emoções e como funcionam
- **Alegria**: Características e benefícios
- **Tristeza**: Processo emocional e superação
- **Raiva**: Gatilhos e controle emocional
- **Medo**: Função biológica e ansiedade
- **Amor**: Tipos de amor e neurociência

#### 🧠 Partes do Cérebro
- **Cérebro Emocional**: Estruturas e funções
- **Sistema Límbico**: Centro das emoções
- **Amígdala**: Processamento do medo
- **Hipocampo**: Memória e aprendizado

### Sistema de Associações
O app mostra como diferentes conceitos se relacionam:
- **Neurotransmissores ↔ Emoções**: Qual neurotransmissor influencia cada emoção
- **Emoções ↔ Partes do Cérebro**: Quais estruturas são ativadas por cada emoção
- **Neurotransmissores ↔ Partes do Cérebro**: Onde cada neurotransmissor atua

## 🎨 Componentes Principais

### AuthLayout
Layout padronizado para páginas de autenticação com header customizável.

### ContentCard
Card genérico para exibir conteúdo nas diferentes seções do app.

### CustomInput
Input customizado com validação e estilização consistente.

### EmotionCard / NeurotransmitterCard / BrainPartCard
Cards especializados para cada tipo de conteúdo com visualizações específicas.

### ChapterCompleteButton
Botão para marcar capítulos como concluídos e salvar progresso.

