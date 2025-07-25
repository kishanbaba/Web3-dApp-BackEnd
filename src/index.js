import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/index.js';
import signatureRoutes from './api/routes/signature.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// --- Core Middleware ---
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Log HTTP requests only when not in 'production'
if (config.nodeEnv !== 'production') {
    app.use(morgan('dev'));
}

// --- API Routes ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// All signature routes are prefixed with /api/v1/signature
app.use('/api/v1/signature', signatureRoutes);


// --- Error Handling ---
// Handle 404 routes not found
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint Not Found' });
});

// Centralized error handler
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
});

export default app;