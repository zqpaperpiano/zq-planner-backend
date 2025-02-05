const db = require('../config/db');

const docRef = db.collection("dungeon");
const archiveRef = db.collection("dungeonArchive");

exports.createNewDungeon = async(dungeon) => {
    try{
        const dungeonRef = (await docRef.add(dungeon));
        const dungeonId = dungeonRef.id;        
        const savedDungeon = await dungeonRef.get();
        const dungeonData = savedDungeon.data();
        return ({
            dungeonId: dungeonId,
            ...dungeonData
        })
    }catch(err){
        throw err;
    }
}

exports.getAllDungeons = async(userId) => {
    try{
        const dungeonList = [];

        docRef.where('createdBy', '==', userId)
        .get()
        .then(snapshot => {
            if(snapshot.empty){
                console.log('No dungeons found');
                return dungeonList;
            }

            snapshot.forEach(doc => {
                dungeonList.push(doc.data());
            });
            return dungeonList;
        })
    }catch(err){
        throw err; 
    }
}

exports.getDungeonById = async(dungeonId) => {
    try{
        const dungeonSnapshot = await docRef.doc(dungeonId).get();
        if(!dungeonSnapshot.exists){
            const err = new Error('Dungeon does not exist');
            err.statusCode = 404;
            throw err;
        }
        return dungeonSnapshot.data();
    }catch(err){
        throw err;
    }
}

exports.updateDungeonDetails = async(dungeonId, dungeonName, dungeonDescription) => {
    try{
        const dungeonRef = docRef.doc(dungeonId);

        await dungeonRef.update({
            dungeonName: dungeonName,
            dungeonDescription: dungeonDescription
        });
        const dungeonSnapshot = await dungeonRef.get();
        return dungeonSnapshot.data();
    }catch(err){
        throw err;
    }
}

exports.updateDungeonCompletions = async(dungeonId, dungeonCheckpoints, completionPercentage, dungeonCompleted) => {
    try{
        const dungeonRef = docRef.doc(dungeonId);

        await dungeonRef.update({
            dungeonCheckpoints: dungeonCheckpoints,
            completionPercentage: completionPercentage,
            dungeonCompleted: dungeonCompleted
        });

        const dungeonSnapshot = await dungeonRef.get();
        return dungeonSnapshot.data();

    }catch(err){
        throw err;
    }
}

exports.deleteDungeon = async(dungeonId) => {
    try{
        const dungeonRef = await docRef.doc(dungeonId).get();

        if(!dungeonSnapshot.exists){
            const err = new Error('Dungeon does not exist');
            err.statusCode = 404;
            throw err;
        }

        await archiveRef.doc(dungeonId).set(dungeonRef.data());
        await dungeonRef.delete();
    }catch(err){
        throw err;
    }
}