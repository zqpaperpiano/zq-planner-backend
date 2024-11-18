const bcrypt = require('bcrypt');
const userService = require('../services/userService');

exports.createNewUser = async (req, res) => {
    const { email, name, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userService.createUser({
            "email": email,
            "name": name,
            "password": hashedPassword,
            "displayName": name,
            "status": "Budding adventurer!",
            "pfp": ""
        });
        res.status(201).json(newUser);
    }catch(err){
        if(err.statusCode === 400){
            res.status(400).send("User already exists!");
        }else{
            res.status(500).send(err);
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
    const { email, displayName, status, pfp } = req.body;
    try{
        const user = await userService.updateDisplayStats(email, displayName, status, pfp);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).send('An error has occured');
    }
}

exports.getUserLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = (await userService.findUserByEmail(email)).data();
        const dbPassword = user.password;
        const passwordValid = await bcrypt.compare(password, dbPassword);

        if(passwordValid){
            res.status(200).json(user);
        }else{
            res.status(400).send("Password and email do not match");
        }
    }catch(err){
        if (err.statusCode === 404){
            res.status(404).send("User not found");
        }else{
            console.log(err);
        }
    }
}

exports.updateUserPreferences = async(req, res) => {
    const {email, displayName, hasSchedule, schedule, hasSalary, salary} = req.body;
    try{
        let verifySched = null;
        let verifySalary = null;
        if(hasSchedule){
            verifySched = schedule;
        }

        if(hasSalary){
            verifySalary = salary;
        }

        const user = await userService.updateUserPreferences(email, displayName, hasSchedule, verifySched, hasSalary, verifySalary);
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
}

