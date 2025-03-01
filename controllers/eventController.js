const eventService = require('../services/eventService');
const admin = require('firebase-admin');

exports.createNewEvent = async(req, res) => {
    const { event } = req.body;

    try{
        const newEvent = await eventService.createNewEvent(event);
        res.status(201).json(newEvent);
    }catch(err){
        console.log(err);
        res.stats(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getAllEvents = async(req, res) => {
    const { userId } = req.params;

    try{
        const eventList = await eventService.getAllEvents(userId)
        res.status(200).json(eventList);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getEventById = async(req, res) => {
    const { eventId } = req.params;

    try{
        const event = await eventService.getEventById(eventId);
        res.status(200).json(event);
    }catch(err){
        if(err.statusCode === 404){
            res.status(404).send("Event does not exist");
        }else{
            console.log(err);
            res.status(500).send("An error in the server has occured. Please try again later.");
        }
    }
}

exports.updateEvent = async(req, res) => {
    const { eventId, updates } = req.body;

    try{
        const updatedEvent = await eventService.updateEvent(eventId, updates);
        res.status(200).json(updatedEvent);
    }catch(err){
        if(err.statusCode === 404){
            res.status(404).send("Event does not exist");
        }else{
            console.log('an error has occured: ', err);
            res.status(500).send("An error in the server has occured. Please try again later.");
        }
    }
}

exports.deleteEvent = async(req, res) => {
    const { eventId } = req.params;

    try{
        const deletedEvent = await eventService.deleteEvent(eventId);
        res.status(200).json(deletedEvent);
    }catch(err){
        if(err.statusCode === 404){
            res.status(404).send("Event does not exist");
        }else{
            console.log(err);
            res.status(500).send("An error in the server has occured. Please try again later.");
        }
    }
}