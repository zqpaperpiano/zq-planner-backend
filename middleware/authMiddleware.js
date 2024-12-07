const auth = require('../config/auth');

verifyToken = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ error: 'No token provided'})
    }

    const token = authHeader.split(' ')[1];

    try{
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    }catch(err){
        console.log(err);
    }
}

module.exports = verifyToken;