'use strict';

const path = require('path');
const express = require('express');

const app = express();

// Reuse the Vercel serverless handler for local dev
const companiesHandler = require('./api/companies.js');

// API route
app.get('/api/companies', (req, res) => companiesHandler(req, res));

// Static frontend
const frontendDir = path.join(__dirname, 'Frontend');
app.use(express.static(frontendDir));

// Fallback to index for root
app.get('/', (_req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Optional: direct routes for static htmls
app.get(['/contact.html', '/companyList.html'], (req, res) => {
  res.sendFile(path.join(frontendDir, req.path.replace(/^\/+/, '')));
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


