const db = require('../config/db');
const docRef = db.collection("user");


exports.gettingGoogleLogins = async(user, uid) => {
    try{

        const docSnapshot = await docRef.doc(uid).get();

        if(docSnapshot.exists){
            return docSnapshot.data();
        }else{
            await docRef.doc(uid).set(user);
            const savedUser = (await docRef.doc(uid).get()).data();

            return savedUser;
        }
    }catch(err){
        throw err;
    }
}

exports.createUser = async (user, uid) => {
    try{
        const docSnapshot = await docRef.doc(uid).get();

        if(docSnapshot.exists){
            const err = new Error('User already exists');
            err.statusCode = 400;
            throw err;
        }
        
        await db.collection("user").doc(uid).set(user);

        const savedUser = (await docRef.doc(uid).get()).data();
        return savedUser;

    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.getUserByUID = async(uid) => {
    try{
        const userSnapshot = await docRef.doc(uid).get();
        if(!userSnapshot.exists){
            console.log('no exist');
            const err = new Error('User does not exist');
            err.statusCode = 404;
            throw  err;
        }
        return userSnapshot.data();
    }catch(err){
        throw err;
    }
}

exports.findUserByEmail = async (email) => {
    try{
        const userSnapshot = await docRef.doc(email).get();
        if(!userSnapshot.exists){
            const err = new Error('User does not exist');
            err.statusCode = 404;
            throw err;
        }
        return userSnapshot;
    }catch(err){
        throw err;
    }
}

exports.getAllUsers = async () => {
    try{
        const usersSnapshot = await docRef.get();
        let responseArr = []
        usersSnapshot.forEach(doc => {
            responseArr.push(doc.data());
        })
        
        return responseArr;
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.updateDisplayStats = async(uid, displayName, status) => {
    try{
        const userRef = docRef.doc(uid);

        await userRef.update({
            "name": displayName,
            "status": status
        });

        const userSnapshot = await userRef.get();
        return userSnapshot.data(); 
    }catch(err){
        throw err;
    }
}

exports.updateUserPreferences = async(uid, preferences, displayName) => {
    try{
        const userRef = docRef.doc(uid);
        await userRef.update({
            "displayName": displayName, 
            "preferences": preferences,
            "completedCalibration": true
        });
        const userSnapshot = await userRef.get();

        return userSnapshot.data();

    }catch(err){
        throw err;
    }
}

exports.updateUserEventCategories = async(uid, categories) => {
    try{
        const userRef = docRef.doc(uid);
        await userRef.update({
            "preferences.categories": categories
        });
        const userSnapshot = await userRef.get();

        return userSnapshot.data();
    }catch(err){
        throw err;
    }
}
