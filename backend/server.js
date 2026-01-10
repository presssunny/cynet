// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Mock Cynet Server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/api/alerts`);
});