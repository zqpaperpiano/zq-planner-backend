const db = require('../config/db');

const eventDocRef = db.collection("events");
const eventArchiveRef = db.collection("eventArchive");

exports.createNewEvent = async(event) => {
    try{
        const eventRef = await eventDocRef.add(event);
        const eventSnapshot = await eventRef.get();
        const eventData = eventSnapshot.data();

        return eventData;
    }catch(err){
        throw err;
    }
}

exports.getAllEvents = async (userId) => {
    try{
        const snapshot = await eventDocRef.where('createdBy', '==', userId).get();

        if(snapshot.empty){
            return {};
        }

        const eventList = snapshot.docs.map(doc => ({
            eventId: doc.id,
            ...doc.data()
        }))

        // console.log(eventList);
        return eventList;
    }catch(err){
        throw err;
    }
}

exports.getEventById = async(eventId) => {
    try{
        const eventSnapshot = await eventDocRef.doc(eventId).get();

        if(!eventSnapshot.exists){
            const err = new Error('Event does not exist');
            err.statusCode = 404;
            throw err;
        }

        return eventSnapshot.data();
    }catch(err){
        throw err;
    }
}

exports.updateEvent = async(eventId, updates) => {
    try{
        const eventRef = eventDocRef.doc(eventId);
        await eventRef.update(updates);
        const eventSnapshot = await eventRef.get();
        return eventSnapshot.data();
    }catch(err){ 
        throw err;
    }
}

exports.deleteEvent = async(eventId) => {
    try{
        const eventRef = eventDocRef.doc(eventId);
        const eventSnapshot = await eventRef.get();

        if(!eventSnapshot.exists){
            const err = new Error('Event does not exist');
            err.statusCode = 404;
            throw err;
        }

        const eventData = eventSnapshot.data();
        await eventArchiveRef.doc(eventId).set(eventData);
        await eventRef.delete();

        return { message: "Event deleted successfully" };
    }catch(err){
        throw err;
    }
}