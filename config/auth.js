const COOKIE_NAME = "authToken"
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false, // Use true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60, // 1 hour
};

module.exports = {COOKIE_NAME, COOKIE_OPTIONS};