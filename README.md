# 🎓 API de Gestão Acadêmica – Professor / Alunos / Turmas

→ Projeto full stack desenvolvido para simular um sistema acadêmico real, aplicando boas práticas de backend modernas. ←
API RESTful desenvolvida para gerenciamento acadêmico, permitindo o controle de **professores, alunos, turmas, matrículas, avaliações e boletins**.  
O projeto segue princípios modernos de arquitetura, separação de responsabilidades e documentação padronizada via **Swagger / OpenAPI**.


---

## 📌 Visão Geral

Esta aplicação foi construída com foco em **boas práticas de mercado**, incluindo:

- Arquitetura em camadas (Controllers, Services, Repositories) (Para garantir a separação de responsabilidades, regras de negócio, persistência dos dados e comunicação HTTP → manutenção e testabilidade)
- Uso de DTOs para entrada e saída de dados (Para maior controle dos dados, assegurando exposições diretas do banco às APIs)
- Documentação automática com Swagger (Para facilitar o consumo de APIs, testes interativos e melhoria do desenvolvimento)
- ORM Prisma com PostgreSQL (Para simplificação de queries complexas e integração com type safety do Ts)
- Estrutura modular e escalável (Para exercício de Clean Architecture e princípios SOLID)

---

## 🧱 Arquitetura do Projeto

O projeto segue uma arquitetura baseada em módulos:

```bash
src/
├── config/
│── infraestructure/
│   ├── generated/
│   └── prisma/
│── middlewares/
│   └── tests/
├── modules/
│   └── classTeacher/
│       ├── schema/
│       └── tests/
│   └── discipline(class)/
│       ├── schema/
│       └── tests/
│   └── enrollment/
│       ├── schema/
│       └── tests/
│   └── evaluation/
│       ├── schema/
│       └── tests/
│   └── evaluationGrade/
│       ├── schema/
│       └── tests/
│   └── report-card/
│       ├── schema/
│       └── tests/
│   └── student/
│       ├── schema/
│       └── tests/
│   └── teacher/
│       ├── schema/
│       └── tests/
│   └── user/
│       ├── auth/
│       ├── schema/
│       └── tests/
├── shared/
│   ├── @types/
│   ├── errors/
│   ├── http/
│   └── utils/
├── routes/
├── app.ts
└── server.ts
```


### Padrões adotados
- **Controller**: recebe a requisição HTTP
- **Service**: contém a regra de negócio
- **Repository**: acesso ao banco de dados
- **DTOs**: contratos explícitos de entrada e saída
- **Schemas OpenAPI**: documentação clara e reutilizável

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger (OpenAPI 3.0)**
- **ESLint / Prettier**

---

## 📄 Documentação da API (Swagger)

A documentação da API está disponível via Swagger UI: http://localhost:3000/api/docs


Nela é possível:
- Visualizar todas as rotas
- Ver schemas de request/response
- Executar chamadas diretamente pelo navegador

---

## 📚 Principais Módulos do Sistema

### 👨‍🏫 Teachers
Responsável pela gestão dos professores da instituição.
- Cadastro e atualização de professores
- Associação de professores às turmas (classes)

---

### 👨‍🎓 Students
Gerenciamento dos alunos.
- Cadastro de alunos
- Matrícula em turmas
- Consulta de histórico acadêmico

---

### 🏫 Classes
Representa as turmas/disciplina ofertadas.
- Criação e gerenciamento de turmas
- Associação com professores
- Definição de semestre/período letivo

---

### 📝 Evaluations
Define os **tipos de avaliações** aplicadas em uma turma.
- Criação de avaliações (prova, trabalho, seminário, etc.)
- Definição de peso da avaliação
- Vínculo da avaliação a uma turma (classe)
> ⚠️ Este módulo **não armazena notas**, apenas a estrutura da avaliação.

---

### 📊 Enrollment
Responsável pelo vínculo entre alunos e turmas.
- Matrícula de alunos em disciplinas
- Centralização das relações aluno ↔ turma
- Base para organização das notas e do boletim

---

### 🧮 EvaluationGrade
Gerenciamento das **notas dos alunos**.
- Registro de notas por avaliação
- Associação direta com o *Enrollment*
- Permite múltiplas notas por aluno conforme as avaliações definidas
> 🔗 Atua como ponte entre **Enrollment** e **Evaluations**, armazenando o desempenho do aluno.

---

### 📊 Report Cards
Geração e consolidação do boletim escolar.
- Cálculo de médias com base nos pesos das avaliações
- Geração de boletins por aluno
- Definição do status final:
  - Aprovado
  - Reprovado
  - Recuperação

---

### 👤 User
Responsável pelos usuários do sistema.
- Cadastro de usuários
- Gerenciamento de login, email e senha
- Vínculo do usuário com o sistema (acesso ao painel, rotas, etc.)

---

### 🔐 Auth
Módulo de autenticação e autorização.
- Autenticação via login e senha
- Geração e validação de token JWT
- Proteção de rotas
- Controle de acesso baseado em usuário autenticado

---

## 🧠 Visão Geral da Arquitetura
O sistema segue uma arquitetura modular, onde:
- **Evaluations** definem *o que* será avaliado
- **Enrollment** define *quem* está vinculado à turma
- **EvaluationGrade** registra *como o aluno se saiu*
- **Report Cards** consolidam os dados acadêmicos
- **Auth** e **User** garantem segurança e controle de acesso


---

## 🧪 Testes de Rotas

As rotas podem ser testadas de duas formas:
- **Swagger UI** (recomendado para entendimento da API)
- **Postman** (coleções manuais ou importadas)
---
### Execução dos Testes
```bash
npm run test
```
---

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js >= 18
- PostgreSQL
- Yarn ou npm

### Instalação
```bash
npm install
```

### Configurações do Banco
```bash
npx prisma migrate dev
```

### Execução do Projeto
```bash
npm run dev
```
