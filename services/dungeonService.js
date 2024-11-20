const db = require('../config/db');

const docRef = db.collection("dungeon");

exports.createDungeon = async(dungeon) => {
    const {dungeonID} = dungeon
    try{
        const dungeonSnapshot = await docRef.doc(dungeonID).get();

        if(dungeonSnapshot.exists){
            const err = new Error('Dungeon already exists');
            err.statusCode=400;
            throw err;
        }

        await db.docRef.set(dungeon);
        const savedDungeon = (await docRef.doc(dungeonID).get()).data();
        return savedDungeon;
    }catch(err){
        throw err;
    }
}