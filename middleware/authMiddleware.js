// middleware/authMiddleware.js

const auth = require('../config/auth');

const COOKIE_NAME = "authToken";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false, // Use true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 3600 * 1000, // 1 hour
};

// Verify token middleware
const verifyToken = async (req, res, next) => {
    let token = req.cookies.authToken;

    console.log('my cookies: ', req.cookies);

    if (!token) {
        const alt = req.body.token;
        if (!alt) {
            return res.status(401).json({ error: 'No token provided' });
        } else {
            token = alt;
        }
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;

        const existingToken = req.cookies?.[COOKIE_NAME];

        if (!existingToken || (decodedToken.exp * 1000 - Date.now() < 10 * 60 * 1000)) {
            console.log('adding into cookies');
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error verifying token' });
    }
};

module.exports = verifyToken;

exports.setAuthCookie = async(req, res) => {
    try{
        const token = req.body.token;
        res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        res.status(200).json({ message: 'Auth cookie set' });
    }catch(err){
        res.status(500).json({ error: 'Error setting auth cookie' });
    }
}

