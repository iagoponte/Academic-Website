import type { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// padrão swagger route: http://localhost:3000/api/docs/
export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Professor API",
      description: "API para gerenciamento acadêmico do professor",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.API_URL ||"http://localhost:3000",
        description: process.env.NODE_ENV == "production" ? "Servidor de Produção" : "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      },
    },
  },
  apis: ["src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
