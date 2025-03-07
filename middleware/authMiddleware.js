const auth = require('../config/auth');

const COOKIE_NAME = "authToken";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600,
    domain: 'localhost'
}

verifyToken = async(req, res, next) => {
    let token = req.cookies.authToken;

    console.log('my cookies: ', req.cookies);

    if(!token){
        const alt = req.body.token;
        if(!alt)
        {return res.status(401).json({ error: 'No token provided'});}
        else{
            token = alt;
        }
    }

    try{
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;

        const existingToken = req.cookies?.[COOKIE_NAME];

        if(!existingToken || (decodedToken.exp * 1000 - Date.now() < 10 * 60 * 1000)){
            console.log('adding into cookies');
            res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        }

        next();
    }catch(err){
        console.log(err);
    }
}

module.exports = verifyToken;