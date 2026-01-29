import type { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    components: {
      // securitySchemes: {
      // bearerAuth: {
      //   type: 'http',
      //   scheme: 'bearer',
      //   bearerFormat: 'JWT',
      // },
      // },
    },
  },
  apis: ["src/**/*.ts"],
};
// swagger route: http://localhost:3000/api/docs/

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
