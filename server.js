// app.js

const express = require('express');
const app = express();

// Import route handlers

const PartnerRoutes=require("./routes/Partner/index.js")
// Use the route handlers
app.use('/partner', PartnerRoutes);
app.use('/flyingspot', FlyingspotRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
