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
├── modules/
│ ├── students/
│ ├── teachers/
│ ├── classes/
│ ├── enrollments/
│ ├── evaluations/
│ └── report-cards/
├── shared/
│ ├── prisma/
│ ├── errors/
│ └── swagger/
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

## 📚 Principais Módulos

### 👨‍🏫 Teachers
- Cadastro de professores
- Associação com turmas

### 👨‍🎓 Students
- Cadastro de alunos
- Matrículas em turmas
- Histórico acadêmico

### 🏫 Classes
- Criação de turmas
- Associação com professores
- Definição de semestre

### 📝 Evaluations
- Registro de avaliações
- Pesos e notas

### 📊 Report Cards
- Geração de boletim
- Cálculo de média
- Status final (Aprovado, Reprovado, Recuperação)

---

## 🧪 Testes de Rotas

As rotas podem ser testadas de duas formas:
- **Swagger UI** (recomendado para entendimento da API)
- **Postman** (coleções manuais ou importadas)

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
