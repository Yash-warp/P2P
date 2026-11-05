import express from 'express';
import cors from 'cors';

import listingsRoutes from './routes/listings.routes.js';
import rentalsRoutes from './routes/rentals.routes.js';
import usersRoutes from './routes/users.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import calculatorRoutes from './routes/calculator.routes.js';
import activityRoutes from './routes/activity.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend, Vercel deployments, and local dev
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Lendit P2P Marketplace Backend',
    version: '1.0.0',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/listings', listingsRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/activity', activityRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found`
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`
==================================================
🚀 Lendit Marketplace Backend Server Running!
📡 Port:    http://localhost:${PORT}
🩺 Health:  http://localhost:${PORT}/api/health
📦 API:     http://localhost:${PORT}/api/listings
==================================================
    `);
  });
}

export default app;

