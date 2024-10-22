// src/config/swagger.js

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AFRIGEM Backend API',
      version: '1.0.0',
      description: 'API documentation for User, Product, and Brand management',
    },
    components: {
      schemas: {
        // Product Schema
        Product: {
          type: 'object',
          properties: {
            product_id: {
              type: 'integer',
            },
            brand_id: {
              type: 'integer',
            },
            product_name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        // Brand Schema
        Brand: {
          type: 'object',
          properties: {
            brand_id: {
              type: 'integer',
            },
            brand_name: {
              type: 'string',
            },
            integration_type: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        // User Schema
        User: {
          type: 'object',
          properties: {
            user_id: {
              type: 'integer',
            },
            email: {
              type: 'string',
            },
            first_name: {
              type: 'string',
            },
            last_name: {
              type: 'string',
            },
            password_hash: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:5000', // Your local server URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your route files for Swagger documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;