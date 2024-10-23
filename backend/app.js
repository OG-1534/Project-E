
const { sequelize, connectPostgresDB } = require('./src/config/postgresDb');
const connectMongoDB = require('./src/config/mongodb');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes'); 
const errorHandler = require('./src/middlewares/errorHandler');
const passwordResetRoutes = require('./src/routes/passwordResetRoutes');
const productRoutes = require('./src/routes/productRoutes');
const brandRoutes = require('./src/routes/brandRoutes');
const aiRoutes = require('./src/routes/aiRoutes');

const subscriptionRoutes = require('./src/routes/subscriptionRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const cron = require('./src/config/cron');

/* to be added later
const { connectRedis } = require('./src/config/redis*/

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocs = require('./src/config/swagger'); 

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Authentication Routes
app.use('/api/auth', authRoutes);

// Password Reset Routes
app.use('/api/password', passwordResetRoutes);

// Register product routes
app.use('/api', productRoutes);

//Register brand routes
app.use('/api', brandRoutes);

// AI Skin Analysis routes
app.use('/api/ai', aiRoutes);

// Subscription routes
app.use('/api/subscription', subscriptionRoutes);

// Sync database and start the server
const startServer = async () => {
    await connectPostgresDB(); // Connect to PostgreSQL
  
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully.');
    }
  
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  
    server.timeout = 300000;  // Set the timeout to 5 minutes (300,000 ms)
  };

startServer();