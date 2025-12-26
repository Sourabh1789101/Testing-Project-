'use strict';

const path = require('path');
const express = require('express');

const app = express();

// Add security headers for local development
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Reuse the Vercel serverless handler for local dev
const companiesHandler = require('./api/companies.js');

// API route
app.get('/api/companies', (req, res) => companiesHandler(req, res));

// Static frontend - serve from public folder (Vercel structure)
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Fallback to index for root
app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Optional: direct routes for static htmls
app.get(['/contact.html', '/companyList.html'], (req, res) => {
  res.sendFile(path.join(publicDir, req.path.replace(/^\/+/, '')));
});

const preferredPort = parseInt(process.env.PORT, 10) || 3000;

function startServer(port, remainingAttempts = 10) {
  const server = app.listen(port, () => {
    console.log(`ConnectCare running at http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && remainingAttempts > 0) {
      const nextPort = port + 1;
      console.warn(`Port ${port} in use, retrying on ${nextPort} ...`);
      startServer(nextPort, remainingAttempts - 1);
      return;
    }
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

startServer(preferredPort);


