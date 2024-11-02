const db = require('../config/db');

//retrieve all users
exports.getAllUsers = () => {
    return db.any('SELECT * FROM users  ');
};

//when creating a new user
exports.createNewUser = (email, username, password) => {
    try{
        return db.tx(async (t) => {
            await t.none('INSERT INTO USERS (user_email, username) values ($1, $2)', [email, username]);
    
            await t.none('INSERT INTO user_login(user_email, password) values ($1, $2)', [email, password]);
        })
    }catch(err){
        console.log(err);
        throw err;
    }
}

//retrieving a specificUser based on their userEmail
exports.getUserByEmail = async (email) => {
    try{
        const user = await db.one('SELECT * from users where user_email = $1', [email]);
        return user;
    }catch(err){
        console.log(err);
        throw err;
    }
}
