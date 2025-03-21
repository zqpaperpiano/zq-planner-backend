const {auth} = require('../config/db');
const {COOKIE_NAME} = require('../config/auth')
const {COOKIE_OPTIONS} = require('../config/auth')

// Verify token middleware
verifyToken = async (req, res, next) => {
    let token = req.cookies.authToken;

    // console.log('my cookies: ', req.cookies);

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
            res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        }

        next();
    } catch (err) {
        if (err.code === 'auth/id-token-expired') {
            res.status(401).json({ error: 'Token expired' });
        }else{
            console.log(err);
            res.status(500).json({ error: 'Error verifying token' });
        }
        
    }
};

module.exports = verifyToken;





