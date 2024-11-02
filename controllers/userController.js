const bcrypt = require('bcrypt');
const userService = require('../services/userService'); 

exports.getAllUsers = async(req, res) => {
    try{
        const users = await userService.getAllUsers();
        res.json(users);  
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

exports.createNewUser = async(req, res) => {
    const {user_email, username, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userService.createNewUser(
            user_email,
            username,
            hashedPassword
        );
        res.status(201).send('User Successfully Created');
    }catch(err){
        console.log(err);
        if(err.code === '23505'){
            res.status(401).send("An account with this email already exists");
        }else{
            res.status(500).send('An error has occured');
        }
    }
}