import express, { Router } from 'express';
import { globalErrorHandler } from './middlewares/errorMiddleware.js';
import { studentRoutes } from './modules/student/student.routes.js';
import { teacherRoutes } from './modules/teacher/teacher.routes.js';
import { classTeacherRoutes } from './modules/classTeacher/classTeacher.routes.js';
import { classRoutes } from './modules/discipline(class)/class.routes.js';
import { enrollmentRoutes } from './modules/enrollment/enrollment.routes.js';
import { gradeRoutes } from './modules/evaluationGrade/evalGrade.routes.js';
import { evaluationRoutes } from './modules/evaluation/evaluation.routes.js';
import { reportCardRoutes } from './modules/report-card/reportCard.routes.js';
import { swaggerSpec } from './config/swagger.js';
import swaggerUi from 'swagger-ui-express'

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Recebido: ${req.method} ${req.url}`);
  next();
});

app.get('/health', (req, res) => {
  console.log('Health check endpoint called');
  return res.json({ ok: true });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (_, res) => {
  res.json(swaggerSpec);
});

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/class-teacher', classTeacherRoutes);
app.use('/api/classes', classRoutes)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/grades', gradeRoutes)
app.use('/api/evaluation', evaluationRoutes)
app.use('/api/report-card', reportCardRoutes)

app.use(globalErrorHandler);

export {app}