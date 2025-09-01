const express = require('express');
const EventModel = require('../schemas/UserEventSchema');
const router = express.Router();
const { getIO } = require('../index'); 

router.get('/getWallData', async (req, res) => {
    const wallData = { upcomingEvents: [], completedEvents: [] };
    const getAll = await EventModel.find();
    const dateToday = Date.now();

    getAll.forEach(item => {
        const eventDateStamp = new Date(item.date).getTime();
        if (dateToday > eventDateStamp) wallData.completedEvents.push(item);
        else wallData.upcomingEvents.push(item);
    });

    res.json(wallData);
});

router.get('/getEventDetails', async (req, res) => {
    const { eventId } = req.query;
    const eventData = await EventModel.findOne({ _id: eventId });
    res.json(eventData);
});

router.post('/bookEvent/:id', async (req, res) => {
    const eventId = req.params.id;
    const event = await EventModel.findOne({ _id: eventId });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.capacity > 0) {
        event.capacity -= 1;
        await event.save();
        getIO().to(eventId).emit('seatUpdated', { capacity: event.capacity });
    }

    res.json({ capacity: event.capacity });
});

module.exports = router;
