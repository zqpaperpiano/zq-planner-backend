const COOKIE_NAME = "authToken"
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true, // Use true in production with HTTPS
    sameSite: 'None',
    maxAge: 1000 * 60 * 60, // 1 hour
};

module.exports = {COOKIE_NAME, COOKIE_OPTIONS};