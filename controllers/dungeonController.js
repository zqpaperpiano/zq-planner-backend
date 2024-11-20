import { v4 as uuidv4 } from 'uuid';
const dungeonService = require('../services/dungeonService');

exports.createNewDungeon = async(req, res) => {
    const {
        dungeonName,
        dungeonDescription,
        posterID,
        checkpoints,
        percentageCompletion
    } = req.body;

    try{
        //check if posterID exists. 
    }catch(err){
        console.log(err);
    }
}