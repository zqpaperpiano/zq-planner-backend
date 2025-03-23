const {db} = require('../config/db');
const moodDiaryRef = db.collection("moodDiary");

exports.createNewMoodDiaryEntry = async (entry) => {
    try{
        const entryRef = await moodDiaryRef.add(entry);
        const entrySnapshot = await entryRef.get();
        const entryData = entrySnapshot.data();

        entryData.entryId = entryRef.id;

        return entryData;
    }catch(err){
        throw err;
    }
}

exports.getAllMoodDiaryEntries = async (userId) => {
    try{
        const snapshot = await moodDiaryRef.where('createdBy', '==', userId).get();

        if(snapshot.empty){
            return {};
        }

        const entryList = snapshot.docs.map(doc => ({
            entryId: doc.id,
            ...doc.data()
        }))

        return entryList;
    }catch(err){
        throw err;
    }
}

exports.getTodaysMoodDiaryEntry = async (userId, date) => {
    try{
        const snapshot = await moodDiaryRef.where('createdBy', '==', userId).where('date', '==', date).get();

        if(snapshot.empty){
            return {};
        }

        const entryList = snapshot.docs.map(doc => ({
            entryId: doc.id,
            ...doc.data()
        }))

        return entryList;
    }catch(err){
        throw err;
    }
}