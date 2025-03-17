const express = require('express');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/hotels', hotelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});