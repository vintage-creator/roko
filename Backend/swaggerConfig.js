const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Roko Endpoints',
    version: '1.0.0',
    description: 'This is a backend application made with Express which provides a detailed description of Roko Restful APIs according to OpenAPI specification.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Israel Abazie',
      url: 'https://www.linkedin.com/in/israel-abazie/',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./Backend/routes/auth_service/*.js','./Backend/routes/claim_service/*.js', './Backend/routes/contact_service/*.js', './Backend/routes/payment_service/*.js', './Backend/routes/policy_service/*.js', './Backend/routes/profile_service/*.js' ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
