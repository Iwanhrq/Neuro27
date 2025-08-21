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
  <!-- Desenvolvimento -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React Native" title="React Native"/>
  <img width="20"/>
  <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/external-expo-a-framework-and-a-platform-for-universal-react-applications-logo-color-tal-revivo.png" height="40" alt="Expo" title="Expo"/>
  <img width="20"/>
  <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" height="40" alt="Firebase" title="Firebase"/>
  <img width="20"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="TypeScript" title="TypeScript"/>
  
  <br/><br/>
  
  <!-- Design -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" alt="Figma" title="Figma"/>
  <img width="20"/>
  <img src="https://img.icons8.com/color/48/pinterest--v1.png" height="40" alt="Pinterest" title="Pinterest"/>

  <br/><br/>

  <!-- Organização -->
  <img src="https://www.vectorlogo.zone/logos/notionhq/notionhq-icon.svg" height="40" alt="Notion" title="Notion"/>
  
  <br/><br/>

  <!-- IDEs -->
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="Visual Studio Code" title="Visual Studio Code"/>
  <img width="20"/>
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" height="40" alt="Cursor IDE" title="Cursor"/>
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
