const dungeonService = require('../services/dungeonService');

exports.createNewDungeon = async(req, res) => {
    const { userId, dungeon } = req.body;

    try{
        dungeon.createdBy = userId;
        const newDungeon = await dungeonService.createNewDungeon(dungeon);
        res.status(201).json(newDungeon);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.getAllDungeons = async(req, res) => {
    const {userId} = req.body;

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
        const dungeon = await dungeonService.getDungeonById(dungeonId);
        res.status(200).json(dungeon);
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
    const { dungeonId, dungeonName, dungeonDescription } = req.body;

    try{
        const dungeon = await dungeonService.updateDungeonDetails(dungeonId, dungeonName, dungeonDescription);
        res.status(200).json(dungeon);
    }catch(err){
        console.log(err);
        res.status(500).send("An error in the server has occured. Please try again later.");
    }
}

exports.updateDungeonCompletions = async(req, res) => {
    const { dungeonId, dungeonCheckpoints, completionPercentaage } = req.body;

    try{
        const dungeonCompleted = completionPercentage === 100 ? true : false;
        const dungeon = await dungeonService.updateDungeonCompletions(dungeonId, dungeonCheckpoints, completionPercentage, dungeonCompleted);
        res.status(200).json(dungeon);
    }catch(err){
        console.log(err);
        res.status(500).send('An error has occured. Please try again later.')
    }
}

exports.deleteDungeon = async(req, res) => {
    const {dungeonId} = req.body;

    try{
        const dungeon = await dungeonService.deleteDungeon(dungeonId);
        res.status(204).send('Dungeon has been deleted');
    }catch(err){
        console.log(err);
        res.status(500).send('An error has occured. Please try again later.');
    }
}