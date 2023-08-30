const swaggerDocs = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const baseRoutes = path.resolve("./docs/swagger/routes");
const baseSchemas = path.resolve("./docs/swagger/schemas");

const getPathRoutes = (filePath) => path.join(baseRoutes, filePath);
const getPathSchemas = (filePath) => path.join(baseSchemas, filePath);

const getDocs = (basePath, getPath) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    const data = require(getPath(`/${file}`));
    return {
      ...acc,
      ...data,
    };
  }, {});
};

module.exports = function generateDocs(app) {
  const docsSources = getDocs(baseRoutes, getPathRoutes);
  const docsSchemas = getDocs(baseSchemas, getPathSchemas);

  const swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      servers: [
        {
          url: "http://localhost:8000",
          description: "Local server",
        },
      ],
      components: {
        securitySchemes: {
          accessToken: {
            description: "Login first and copy token here",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: docsSchemas,
        parameters: {
          page: {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
              default: 0,
            },
            description: "Page number",
          },
          pageSize: {
            in: "query",
            name: "pageSize",
            schema: {
              type: "integer",
              default: 10,
            },
            description: "Number of items per page",
          },
          filtered: {
            in: "query",
            name: "filtered",
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  value: { type: "string" },
                },
              },
            },
            description: "Filter criteria as an array of objects",
          },
          sorted: {
            in: "query",
            name: "sorted",
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  desc: { type: "boolean" },
                },
              },
            },
            description: "Sort criteria as an array of objects",
          },
        },
      },
      info: {
        title: "Api Docs NusaLeaning",
        version: "1.0.0",
      },
      paths: docsSources,
    },
    apis: [],
  };

  const swaggerSpec = swaggerDocs(swaggerOptions);

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  const options = {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: "/api-docs.json",
          name: "API",
        },
      ],
    },
  };

  const swaggerHTML = swaggerUI.generateHTML(swaggerSpec, options);
  app.use("/v1/api-docs", swaggerUI.serveFiles(swaggerHTML, options));
  app.get("/v1/api-docs", (req, res) => {
    res.send(swaggerHTML);
  });
};
