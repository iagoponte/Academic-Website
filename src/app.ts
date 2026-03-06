import express, { Router } from 'express';
import cors from 'cors'; // Import the cors package
import { globalErrorHandler } from './middlewares/errorMiddleware.js';
import { studentRoutes } from './modules/student/student.routes.js';
import { teacherRoutes } from './modules/teacher/teacher.routes.js';
import { classTeacherRoutes } from './modules/classTeacher/classTeacher.routes.js';
import { classRoutes } from './modules/discipline/class.routes.js';
import { enrollmentRoutes } from './modules/enrollment/enrollment.routes.js';
import { gradeRoutes } from './modules/evaluationGrade/evalGrade.routes.js';
import { evaluationRoutes } from './modules/evaluation/evaluation.routes.js';
import { reportCardRoutes } from './modules/reportCard/reportCard.routes.js'; 
import { setupSwagger } from './config/swagger.js';
import { userRoutes } from './modules/user/user.routes.js';

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend's development server
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Recebido: ${req.method} ${req.url}`);
  next();
});

//swagger
setupSwagger(app);

app.get('/health', (req, res) => {
  console.log('Health check endpoint called');
  return res.json({ ok: true });
});

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/class-teacher', classTeacherRoutes);
app.use('/api/classes', classRoutes)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/grades', gradeRoutes)
app.use('/api/evaluations', evaluationRoutes)
app.use('/api/report-card', reportCardRoutes)
app.use('/api/users', userRoutes)

app.use(globalErrorHandler);

export {app}
