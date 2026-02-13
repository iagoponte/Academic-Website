# 📚 Sistema Acadêmico – Documentação do Banco de Dados

## 1. Visão Geral

Banco de dados relacional utilizando **PostgreSQL**, modelado com Prisma ORM.

O sistema contempla:

- Controle de usuários
- Perfis acadêmicos (Aluno e Professor)
- Turmas
- Matrículas
- Avaliações
- Lançamento de notas

## 2. Estrutura

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
│   ├── auth/
│   ├── classTeacher/
│       ├── schema/
│       └── tests/
│   ├── discipline/
│       ├── schema/
│       └── tests/
│   ├── enrollment/
│       ├── schema/
│       └── tests/
│   ├── evaluation/
│       ├── schema/
│       └── tests/
│   ├── evaluationGrade/
│       ├── schema/
│       └── tests/
│   ├── reportCard/
│       ├── schema/
│       └── tests/
│   ├── student/
│       ├── schema/
│       └── tests/
│   ├── teacher/
│       ├── schema/
│       └── tests/
│   ├── user/
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

---

## 3. Stack Tecnológica

- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Identificadores:** UUID
- **Controle temporal:** createdAt / updatedAt automáticos

---

## 4. Diagrama Entidade-Relacionamento (ERD)

```mermaid
classDiagram
    direction LR

    class User {
        +String id
        +String email
        +String password
        +Role[] roles
        +DateTime createdAt
        +DateTime updatedAt
    }

    class Student {
        +String id
        +String name
        +String registrationNumber
        +Boolean isActive
        +String userId
    }

    class Teacher {
        +String id
        +String name
        +String userId
    }

    class Class {
        +String id
        +String name
        +String semester
        +DateTime createdAt
    }

    class Enrollment {
        +String id
        +String studentId
        +String classId
        +DateTime createdAt
    }

    class ClassTeacher {
        +String id
        +String teacherId
        +String classId
    }

    class Evaluation {
        +String id
        +EvaluationType type
        +Float weight
        +String description
        +String classId
        +DateTime createdAt
        +DateTime updatedAt
    }

    class EvaluationGrade {
        +String id
        +String enrollmentId
        +String evaluationId
        +Float value
        +DateTime createdAt
        +DateTime updatedAt
    }

    User "1" --> "0..1" Student : profile
    User "1" --> "0..1" Teacher : profile

    Student "1" --> "0..n" Enrollment : enrollments
    Class "1" --> "0..n" Enrollment : contains

    Teacher "1" --> "0..n" ClassTeacher : teaches
    Class "1" --> "0..n" ClassTeacher : has

    Class "1" --> "0..n" Evaluation : evaluations
    Enrollment "1" --> "0..n" EvaluationGrade : grades
    Evaluation "1" --> "0..n" EvaluationGrade : generates
```

---

## 5. Modelo Lógico

---

### 5.1 User

Tabela responsável pela autenticação e autorização do sistema.

| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | UUID | PK |
| email | String | UNIQUE |
| password | String | NOT NULL |
| roles | Enum[] | Multivalorado |
| createdAt | DateTime | Default now() |
| updatedAt | DateTime | Auto-update |

Relacionamentos:
- 1:1 com Student (opcional)
- 1:1 com Teacher (opcional)

---

### 5.2 Student

Representa o perfil acadêmico do aluno.

| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | UUID | PK |
| name | String | NOT NULL |
| registrationNumber | String | UNIQUE |
| isActive | Boolean | Default true |
| userId | FK | UNIQUE |

Relacionamentos:
- 1:N com Enrollment

---

### 5.3 Teacher

Perfil acadêmico do professor.

Relacionamentos:
- 1:N com ClassTeacher

---

### 5.4 Class

Representa uma turma em determinado semestre.

Relacionamentos:
- 1:N com Enrollment
- 1:N com ClassTeacher
- 1:N com Evaluation

---

### 5.5 Enrollment

Tabela de matrícula (N:N entre Student e Class).

Constraint importante:
```
@@unique([studentId, classId])
```

Garante que um aluno não pode se matricular duas vezes na mesma turma.

---

### 5.6 ClassTeacher

Tabela associativa (N:N entre Teacher e Class).

Constraint:
```
@@unique([teacherId, classId])
```

---

### 5.7 Evaluation

Avaliações pertencentes a uma turma.

Constraint:
```
@@unique([classId, type])
```

Impede duplicação do mesmo tipo de avaliação em uma turma.

Observação:
- onDelete: Cascade → Se a turma for removida, as avaliações também serão.

---

### 5.8 EvaluationGrade

Notas de alunos em avaliações.

Constraint:
```
@@unique([enrollmentId, evaluationId])
```

Garante apenas uma nota por aluno por avaliação.

Index:
```
@@index([enrollmentId])
```

Otimiza consultas por matrícula.

---

## 6. Enums

### Role

- Teacher
- Student
- Administrator
- Coordinator
- Director

### EvaluationType

- AV1
- AV2
- FINAL
- SUBSTITUTIVE
- OTHER

---

## 7. Regras de Negócio Implementadas no Banco

✔ Um usuário pode ter múltiplos papéis  
✔ Um aluno não pode se matricular duas vezes na mesma turma  
✔ Um professor não pode ser vinculado duas vezes à mesma turma  
✔ Uma turma não pode ter duas avaliações do mesmo tipo  
✔ Um aluno só pode ter uma nota por avaliação  

---

## 8. Decisões Arquiteturais

- Uso de UUID para evitar colisão e facilitar ambientes distribuídos
- Uso de tabelas associativas explícitas para controle N:N
- Separação entre autenticação (User) e perfis acadêmicos (Student/Teacher)
- Uso de constraints compostas para garantir integridade de dados

---

## 9. Possíveis Evoluções Futuras

- Controle de presença (Attendance)
- Histórico escolar consolidado
- Logs de auditoria
- Soft delete para entidades críticas
- Versionamento de avaliações

---