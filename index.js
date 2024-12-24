// index.js
// Request Header Parser Microservice

// Initialize the project
const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const app = express();

// Enable CORS for cross-origin access
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve the main landing page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to parse request headers
app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ip; // Get IP address
  const language = req.headers['accept-language']; // Get preferred language
  const software = req.headers['user-agent']; // Get user-agent for software info


// Respond with JSON containing the extracted information
res.json({
  ipaddress,
  language,
  software,
  });
});

// Handle undefined routes
app.use((req,res) => {
  res.status(404).json({error: "Endpoint not found" })
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`App is running and listening on port ${PORT}`);
});
