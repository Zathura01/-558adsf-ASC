const express = require('express')
const router = express.Router()
const uploads = require('../services/MulterSetup');
const EventModel = require('../schemas/UserEventSchema');



router.post('/create', 
    uploads.fields([
        {name:'image', maxCount:5},
        {name:'video', maxCount:1}
    ])
    ,async(req, res)=>{

    const { title, description, date, time, location, capacity, createdBy } = req.body;

    const img = (req.files['image'] || []).map((file)=> 'http://localhost:2500/getImg/'+file.filename)
    const vid = req.files['video'] ? 'http://localhost:2500/getVid/'+ req.files['video'][0].filename : null


    const newEvent = new EventModel({ title, description, date, time, location, capacity, createdBy, images: img, video: vid})
    await newEvent.save()

    res.status(201).json({mgs:"Data saved"})
    
    
})

module.exports = router