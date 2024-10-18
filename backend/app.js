const { sequelize, connectPostgresDB } = require('./src/config/postgresDb')
const connectMongoDB = require('./src/config/mongodb');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes'); 
const errorHandler = require('./src/middlewares/errorHandler');
const passwordResetRoutes = require('./src/routes/passwordResetRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Connect to MongoDB
//connectMongoDB();

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'AFRIGEM Beauty API',
        version: '1.0.0',
        description: 'API documentation for AFRIGEM Beauty',
      },
      servers: [
        {
          url: 'http://localhost:5000', // Adjust to match your base URL
        },
      ],
    },
    apis: ['./src/routes/*.js'],  // Path to your route files
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Authentication Routes
app.use('/api/auth', authRoutes);

// Password Reset Routes
app.use('/api/password', passwordResetRoutes);

// Sync database and start the server
const startServer = async () => {
    await connectPostgresDB(); // Connect to PostgreSQL
  
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully.');
    }
  
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  };
  
  startServer();
