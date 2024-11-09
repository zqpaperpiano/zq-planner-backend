const db = require('../config/db');

const docRef = db.collection("users");

exports.createUser = async (user) => {
    try{
        const userId = user.email;
        const docSnapshot = await docRef.doc(userId).get();

        if(docSnapshot.exists){
            const err = new Error('User already exists');
            err.statusCode = 400;
            throw err;
        }
        
        await  db.collection("users").doc(userId).set(user);

        const savedUser = (await docRef.doc(userId).get()).data();
        return savedUser;

    }catch(err){
        console.log(err);
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

exports.updateDisplayStats = async(email, displayName, status, pfp) => {
    try{
        const userRef = docRef.doc(email);

        await userRef.update({
            "displayName": displayName,
            "status": status,
            "pfp": pfp
        });

        return {code: 200, message: "Information successfully updated"}
    }catch(err){
        throw err;
    }
}
