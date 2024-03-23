const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./Routes/data.route');
const cors = require('cors');

require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', dataRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
