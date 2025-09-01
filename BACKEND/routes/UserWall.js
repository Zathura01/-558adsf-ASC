const express = require('express');
const EventModel = require('../schemas/UserEventSchema');
const router = express.Router()

router.get('/userHome', async (req, res) => {
  try {
    const wallData = {
      upcomingEvents: [],
      completedEvents: []
    };

    const { userId, token } = req.query;
    const getWallData = await EventModel.find({ createdBy: userId });

    const dateToday = Date.now();

    getWallData.forEach((item) => {
      const eventDateStamp = new Date(item.date).getTime();
      if (dateToday > eventDateStamp) {
        wallData.completedEvents.push(item);
      } else {
        wallData.upcomingEvents.push(item);
      }
    });

    res.json(wallData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router