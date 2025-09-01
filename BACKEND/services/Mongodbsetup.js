const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/eventMan'; 

const conn = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports = conn;
