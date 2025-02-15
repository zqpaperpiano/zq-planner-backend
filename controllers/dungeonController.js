const dungeonService = require('../services/dungeonService');
const admin = require('firebase-admin');

exports.createNewDungeon = async(req, res) => {
    const { userId, dungeon } = req.body;

    try{
        dungeon.createdBy = userId;
        dungeon.createdAt = admin.firestore.FieldValue.serverTimestamp();
        const newDungeon = await dungeonService.createNewDungeon(dungeon);
        res.status(201).json(newDungeon);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getAllDungeons = async(req, res) => {
    const {userId} = req.params;

    try{
        const dungeonList = await dungeonService.getAllDungeons(userId);
        res.status(200).json(dungeonList);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getDungeonById = async(req, res) => {
    const { dungeonId } = req.body;

    try{
        const dungeon = await dungeonService.getDungeonById(dungeonId)
    }catch(err){
        if(err.statusCode === 404){
            res.status(404).send("Dungeon does not exist");
        }else{
            console.log(err);
            res.status(500).send("An error in the server has occured. Please try again later.");
        }
    }
}

exports.updateDungeonDetails = async(req, res) => {
    const {dungeonId, dungeonName, dungeonDescription, dungeonCheckpoints, completionPercentage} = req.body;

    try{
        const dungeonCompleted = completionPercentage === 1 ? true : false;
        const updatedDungeon = await dungeonService.updateDungeonDetails(dungeonId, dungeonName, dungeonDescription, dungeonCheckpoints, completionPercentage, dungeonCompleted)
        .then(res => {
            console.log(res);
            return res;
        })
        res.status(200).json(updatedDungeon);
    }catch(err){
        if(err.statusCode === 404){
            res.status(404).send("Dungeon does not exist");
        }else{
            console.log('error!!!');
            console.log(err);
            res.status(500).send(err);
        }
    }
}

exports.deleteDungeon = async(req, res) => {
    const {dungeonId} = req.body;

    try{
        await dungeonService.deleteDungeon(dungeonId);
        res.status(204).send('Dungeon has been deleted');
    }catch(err){
        console.log(err);
        res.status(500).send('An error has occured. Please try again later.');
    }
}