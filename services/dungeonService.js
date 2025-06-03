const {db} = require('../config/db');

const docRef = db.collection("dungeon");
const archiveRef = db.collection("dungeonArchive");
const completedRef = db.collection("completedDungeons");

exports.createNewDungeon = async(dungeon) => {
    try{
        const dungeonRef = (await docRef.add(dungeon));
        const dungeonId = dungeonRef.id;        
        const savedDungeon = await dungeonRef.get();
        const dungeonData = savedDungeon.data();

        const newDungeon = {
            [dungeonId]: 
                dungeonData
        }
        return newDungeon;
    }catch(err){
        throw err;
    }
}

exports.getAllDungeons = async (userId) => {
    try {
        // Fetch the dungeons from Firestore
        const snapshot = await docRef.where('createdBy', '==', userId).get();

        if (snapshot.empty) {
            console.log('No dungeons found');
            return {};  // Return an empty object if no dungeons are found
        }

        // Build the dungeonList object with dungeonId as key and dungeonData as value
        const dungeonList = snapshot.docs.reduce((acc, doc) => {
            const dungeonData = doc.data();
            const dungeonId = doc.id;
            acc[dungeonId] = dungeonData;  // Add dungeonData directly as the value
            return acc;
        }, {});

        return dungeonList;  // Return the object containing all dungeons
    } catch (err) {
        throw err;  // Handle any errors by throwing them to be caught in the controller
    }
};

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

exports.updateDungeonDetails = async(dungeonId, dungeonName, color, dungeonDescription, dungeonCheckpoints, completionProgress, dungeonCompleted) => {
    try{
        const dungeonRef = await docRef.doc(dungeonId);
        const dungeonSnapshot = await dungeonRef.get();

        if(!dungeonSnapshot.exists){
            const err = new Error('Dungeon does not exist');
            err.statusCode = 404;
            throw err;
        }

        await dungeonRef.update({
            dungeonName: dungeonName,
            color: color, 
            dungeonDescription: dungeonDescription,
            dungeonCheckpoints: dungeonCheckpoints,
            completionProgress: completionProgress,
            dungeonCompleted: dungeonCompleted
        });

        const updatedDungeonSnapshot = await dungeonRef.get();
        const updatedData = updatedDungeonSnapshot.data();

        // Return the dungeonId as the key, with the updated dungeon data as the value
        return { [dungeonId]: updatedData };
    
    }catch(err){
        throw err;
    }
}

exports.completedDungeon = async(dungeonId, dungeonName, color, dungeonDescription, dungeonCheckpoints, completionProgress, dungeonCompleted) => {
    try{
        const dungeonRef = await docRef.doc(dungeonId);
        const dungeonSnapshot = await dungeonRef.get();

        if(!dungeonSnapshot.exists){
            const err = new Error('Dungeon does not exist');
            err.statusCode = 404;
            throw err;
        }

        await completedRef.doc(dungeonId).set(dungeonSnapshot.data());
        await dungeonRef.delete();

        return { message: 'Dungeon completed and archived successfully' };
    }catch(err){
        throw err;
    }
}

exports.deleteDungeon = async(dungeonId) => {
    try {
        const dungeonRef = docRef.doc(dungeonId); // Ensure `docRef` is a collection reference
        const dungeonSnap = await dungeonRef.get(); // Get the document snapshot

        if (!dungeonSnap.exists) {
            const err = new Error('Dungeon does not exist');
            err.statusCode = 404;
            throw err;
        }

        const dungeonData = dungeonSnap.data(); // Extract the data

        // Archive the dungeon data before deleting
        await archiveRef.doc(dungeonId).set(dungeonData);

        // Delete the dungeon
        await dungeonRef.delete();

        return { message: 'Dungeon deleted successfully' };
        } catch (err) {
            console.error('Error deleting dungeon:', err);
            throw err;
        }
}