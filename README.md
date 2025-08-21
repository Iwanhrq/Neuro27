# 🧠 Neuro27

O **Neuro27** é um aplicativo mobile interativo desenvolvido em **React Native** que explica como os neurotransmissores agem no cérebro e influenciam as emoções humanas.  
Ele combina **conteúdos educativos**, **visualizações dinâmicas** e **recursos interativos** para tornar o aprendizado de neurociência mais acessível e envolvente.
O nosso **objetivo** é democratizar o ensino neurocientífico e promover a alfabetização emocional dos nossos usuários.


---

## 🚀 Funcionalidades (até o momento) 
* 📚 **Conteúdo educativo** sobre partes do cérebro, neurotransmissores, emoções e suas funções. 
* 🎨 **Visualizações dinâmicas** que ajudam a compreender como o cérebro processa emoções.
* 🔐 **Autenticação com Firebase** (login e cadastro seguros).
* 👤 **Tela de perfil** para personalização da experiência do usuário.
* ⚡ Uso do **Expo** para agilizar desenvolvimento, testes e deploy.

---

## 🚀 Tecnologias e Ferramentas

<div align="center">
  <!-- Primeira fileira -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnative/reactnative-original.svg" height="50" alt"React Native" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original-wordmark.svg" height="50" alt"Expo" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" height="50" alt"Firebase" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="50" alt"TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" height="50" alt"Figma" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" height="50" alt="Notion" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" height="50" alt="Visual Studio Code"/>
</div>

---

## 📂 Estrutura do projeto

```bash
Neuro27/
├── app/                        # Código-fonte principal do app
│   ├── (panel)/                # Páginas sem abas (login, registro, etc.)
│   │   ├── _layout.tsx         # Layout para telas do painel
│   │   ├── ForgotPassword/     # Recuperação de senha
│   │   │   └── _layout.tsx
│   │   ├── login.tsx           # Tela de login
│   │   ├── outset.tsx          # Tela inicial/introdução
│   │   └── register.tsx        # Tela de registro
│   │
│   ├── (tabs)/                 # Páginas com navegação por abas
│   │   ├── _layout.tsx         # Layout para as abas
│   │   ├── brain.tsx           # Informações sobre o cérebro
│   │   ├── emotions.tsx        # Relação entre emoções e neurotransmissores
│   │   ├── home.tsx            # Tela inicial principal
│   │   ├── neurotransmitters.tsx # Detalhes dos neurotransmissores
│   │   └── profile.tsx         # Tela de perfil do usuário
│   │
│   ├── chapters.tsx            # Conteúdo educacional (capítulos/seções)
│   └── index.tsx               # Ponto de entrada do app
│
├── assets/                     # Recursos estáticos (imagens, fontes, etc.)
├── components/                 # Componentes reutilizáveis de UI
├── constants/                  # Constantes globais (chaves, URLs, etc.)
├── types/                      # Tipagens do TypeScript
│
├── app.json                    # Configuração do Expo (nome, ícone, splash)
├── eslint.config.js            # Configuração do ESLint
├── package.json                # Dependências e scripts do projeto
├── package-lock.json           # Travamento de versões de dependências
├── tsconfig.json               # Configuração do TypeScript
├── README.md                   # Documentação principal
├── readme-images/              # Imagens usadas no README
├── .vscode/                    # Configurações específicas do VS Code
└── .gitignore                  # Arquivos e pastas ignorados pelo Git
