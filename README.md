<div align="center">

---

### 🧙‍♂️

## *"All we have to decide is what to do with the time that is given us"*

### **— Gandalf, The Lord of the Rings**

---

</div>

# HumanTrack GAS - Goal Attainment Scaling

**Teste técnico** - Protótipo de sistema de configuração de GAS (Goal Attainment Scaling) com sugestões de IA para acompanhamento clínico de pacientes.

🌐 **[Ver projeto ao vivo](https://teste-humantrack.vercel.app)**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

##  Sobre o Projeto

Aplicação para configuração de GAS (Goal Attainment Scaling) com:
- Sugestões de metas via IA (simulação)
- Níveis de avaliação (-2 a +2)
- Integração com WhatsApp para lembretes
- Interface moderna e intuitiva
- Acessibilidade e validações completas

##  Tecnologias

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **Custom Hooks** - State Management

## Estrutura do Projeto

```
src/
├── App.tsx                    # Orquestração principal
├── hooks/                     # Custom Hooks (Lógica)
│   ├── useGasForm.ts         # Gerenciamento de formulário
│   ├── useGoals.ts           # CRUD de metas
│   └── useAISuggestions.ts   # Sugestões de IA
├── utils/                     # Funções utilitárias
│   ├── validation.ts         # Validações centralizadas
│   ├── focus.ts              # Abstração de DOM
│   └── goal-factory.ts       # Factory de Goals
├── components/                # Componentes React
│   ├── common/               # Componentes reutilizáveis
│   ├── gas/                  # Seção de GAS
│   ├── goals/                # Seção de metas
│   ├── patient/              # Seção de paciente
│   └── reminders/            # Seção de lembretes
├── types/                     # Definições TypeScript
└── constants/                 # Constantes da aplicação
```

## Arquitetura

Este projeto implementa **Clean Architecture** com separação clara de responsabilidades:

```
┌─────────────┐
│   App.tsx   │  ← Orquestração
└──────┬──────┘
       │
   ┌───┴────┬──────────┬──────────┐
   │        │          │          │
┌──▼──┐  ┌──▼──┐  ┌────▼─────┐  ┌─▼──┐
│Hooks│  │Utils│  │Components│  │etc │
└─────┘  └─────┘  └──────────┘  └────┘
```

### Camadas

- **Hooks**: Lógica de estado isolada e reutilizável
- **Utils**: Funções puras sem side effects
- **Components**: Apenas apresentação (UI)
- **Types**: Type-safety completo
- **Constants**: Single source of truth

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/mkamaroski1/teste-humantrack.git

# Entre na pasta
cd teste-humantrack

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:5173
```

### Build

```bash
# Gera build de produção
npm run build

# Preview do build
npm run preview
```

### Linting

```bash
# Verifica erros de lint
npm run lint
```

### Testes

```bash
# Executa testes
npm test

# Testes com interface UI
npm run test:ui

# Testes com coverage
npm run test:coverage
```

## Funcionalidades

### 1. Formulário GAS
- Nome da GAS
- Datas de início e fim
- Problemas e objetivos clínicos
- **Sugestão automática de meta** via IA (simulação)

### 2. Gerenciamento de Pacientes
- Seleção de paciente
- Telefone para WhatsApp
- Máscara de telefone automática

### 3. Lembretes
- Configuração de recorrência
- Dias e horários de disparo
- Toggle visual para cada dia

### 4. Metas (Goals)
- Múltiplas metas por GAS
- Linha base (nível 0 ou -1)
- 5 níveis de avaliação (-2, -1, 0, 1, 2)
- **Sugestão automática de níveis** via IA (simulação)
- Duplicar e deletar metas
- Validação completa

### 5. Validações
- Validação bem definidas
- Foco automático em campos com erro
- Mensagens contextuais

### 6. Feedback Visual
- Loading durante processamento
- Highlight em campos afetados pela IA (simulação)
- Animações suaves
- Modal de sucesso

## Licença

Este projeto é parte de um teste técnico.

## Links Úteis

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---


