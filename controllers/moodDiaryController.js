const moodDiaryService = require('../services/moodDiaryService');

exports.createNewMoodDiaryEntry = async(req, res) => {
    const { entry } = req.body;
    try{
        const newEntry = await moodDiaryService.createNewMoodDiaryEntry(entry);
        res.status(201).json(newEntry);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getAllMoodDiaryEntries = async(req, res) => {
    const userId = req.user.uid;
    try{
        const entryList = await moodDiaryService.getAllMoodDiaryEntries(userId);
        res.status(200).json(entryList);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getTodaysMoodDiaryEntry = async(req, res) => {
    const userId = req.user.uid;
    try{
        const today = new Date();
        console.log(today);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}