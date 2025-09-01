const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 120
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,  // store as full Date object
    required: true
  },
  time: {
    type: String, // keep time as string ("14:30")
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  video: {
    type: String 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register", 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EventModel = mongoose.model('Event', eventSchema)
module.exports = EventModel