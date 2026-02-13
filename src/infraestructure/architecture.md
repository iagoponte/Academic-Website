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

---

## 2. Stack Tecnológica

- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Identificadores:** UUID
- **Controle temporal:** createdAt / updatedAt automáticos

---

## 3. Diagrama Entidade-Relacionamento (ERD)

```mermaid
erDiagram

    USER {
        string id
        string email
        string password
    }

    STUDENT {
        string id
        string userId
        string registrationNumber
    }

    TEACHER {
        string id
        string userId
    }

    CLASS {
        string id
        string name
        string semester
    }

    ENROLLMENT {
        string id
        string studentId
        string classId
    }

    EVALUATION {
        string id
        string classId
        float weight
    }

    EVALUATIONGRADE {
        string id
        string enrollmentId
        string evaluationId
        float value
    }

    CLASSTEACHER {
        string id
        string teacherId
        string classId
    }

    USER ||--o| STUDENT : has
    USER ||--o| TEACHER : has

    STUDENT ||--o{ ENROLLMENT : enrolls
    CLASS ||--o{ ENROLLMENT : contains

    TEACHER ||--o{ CLASSTEACHER : teaches
    CLASS ||--o{ CLASSTEACHER : has

    CLASS ||--o{ EVALUATION : has
    ENROLLMENT ||--o{ EVALUATIONGRADE : receives
    EVALUATION ||--o{ EVALUATIONGRADE : generates
```

---

## 4. Modelo Lógico

---

### 4.1 User

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

### 4.2 Student

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

### 4.3 Teacher

Perfil acadêmico do professor.

Relacionamentos:
- 1:N com ClassTeacher

---

### 4.4 Class

Representa uma turma em determinado semestre.

Relacionamentos:
- 1:N com Enrollment
- 1:N com ClassTeacher
- 1:N com Evaluation

---

### 4.5 Enrollment

Tabela de matrícula (N:N entre Student e Class).

Constraint importante:
```
@@unique([studentId, classId])
```

Garante que um aluno não pode se matricular duas vezes na mesma turma.

---

### 4.6 ClassTeacher

Tabela associativa (N:N entre Teacher e Class).

Constraint:
```
@@unique([teacherId, classId])
```

---

### 4.7 Evaluation

Avaliações pertencentes a uma turma.

Constraint:
```
@@unique([classId, type])
```

Impede duplicação do mesmo tipo de avaliação em uma turma.

Observação:
- onDelete: Cascade → Se a turma for removida, as avaliações também serão.

---

### 4.8 EvaluationGrade

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

## 5. Enums

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

## 6. Regras de Negócio Implementadas no Banco

✔ Um usuário pode ter múltiplos papéis  
✔ Um aluno não pode se matricular duas vezes na mesma turma  
✔ Um professor não pode ser vinculado duas vezes à mesma turma  
✔ Uma turma não pode ter duas avaliações do mesmo tipo  
✔ Um aluno só pode ter uma nota por avaliação  

---

## 7. Decisões Arquiteturais

- Uso de UUID para evitar colisão e facilitar ambientes distribuídos
- Uso de tabelas associativas explícitas para controle N:N
- Separação entre autenticação (User) e perfis acadêmicos (Student/Teacher)
- Uso de constraints compostas para garantir integridade de dados

---

## 8. Possíveis Evoluções Futuras

- Controle de presença (Attendance)
- Histórico escolar consolidado
- Logs de auditoria
- Soft delete para entidades críticas
- Versionamento de avaliações

---