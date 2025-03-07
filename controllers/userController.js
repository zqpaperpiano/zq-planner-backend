const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const COOKIE_OPTIONS = require('../config/auth');
const COOKIE_NAME = require('../config/auth');

exports.gettingGoogleLogins = async(req, res) => {
    const {uid, email, name} = req.body;

    try{
        const newUser = await userService.gettingGoogleLogins({
            "email": email,
            "name": name,
            "status": "The player has not set a status yet",
            "completedCalibration": false
        }, uid);

        // res.cookie('idToken', idToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "Lax",
        // });


        res.status(201).json(newUser);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

exports.createNewUser = async (req, res) => {
    const { email, name } = req.body;
    try{
        const uid = req.user.uid;
        const newUser = await userService.createUser({
            "email": email,
            "name": name,
            "status": "The player has not set a status yet",
            "completedCalibration": false
        }, uid);
        res.status(201).json(newUser);
    }catch(err){
        console.log('from controller: ', err);
        if(err.statusCode === 400){
            res.status(400).send("User already exists!");
        }else{
            res.status(500).send(err);
        }
        
    }
}

exports.getUserByUid = async(req, res) => {
    const { uid } = req.body;
    try{
        const user = await userService.getUserByUID(uid);
        res.status(200).json(user.data());
    }catch(err){
        console.log(err)
        if(err.statusCode===404){
            res.status(404).send('User does not exist');
        }else{
            res.status(500).send('An error has occured. Please try again');
        }
    }
}

exports.getUserByEmail = async(req, res) => {
    const {email} = req.body;
    try{
        const user = await userService.findUserByEmail(email);
        res.status(200).json(user.data());
    }catch(err){
        if(err.statusCode===404){
            res.status(404).send("User does not exist");
        }else{
            res.status(500).send("An error has occured. Please try again. ");
        }
    }
}

exports.getAllUsers = async(req, res) => {
    try{
        const user = await userService.getAllUsers();
        res.status(200).json(user);
    }catch(err){
        if(err.statusCode === 404){
            res.status(404);
        }else{
            res.status(500).send('An error has occured');
        }
    }
}

exports.updateDisplayInformation = async(req, res) => {
    const { uid, displayName, status } = req.body;
    try{
        const user = await userService.updateDisplayStats(uid, displayName, status);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).send('An error has occured');
    }
}

exports.getUserLogin = async(req, res) => {
    try{
        const uid = req.user.uid;
        const user = await userService.getUserByUID(uid);
        res.status(200).json(user);
    }catch(err){
        if (err.statusCode === 404){
            res.status(404).send("User not found");
        }else{
            console.log(err);
        }
    }
}

exports.updateUserPreferences = async(req, res) => {
    const {uid, displayName, preferences} = req.body;

    try{
        const user = await userService.updateUserPreferences(uid, preferences, displayName);
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
}


exports.updateUserEventCategories = async(req, res) => {
    const {uid, categories} = req.body;

    try{
        const user = await userService.updateUserEventCategories(uid, categories);
        console.log(user);
        res.status(200).send(user);
    }catch(err){
        console.log('error from controller for event category update: ', err);
    }
}

exports.setAuthCookie = async(req, res) => {
    const {token} = req.body;

    try{
        res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        res.status(200).send('Cookie set');
    }catch(err){
        res.status(500).send('An error has occured');
    }
}


