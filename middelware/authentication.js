const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Extracted Token:", token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
        if (err) {
            console.log("Token Verification Error:", err);
            return res.sendStatus(403);
        }

        req.user = user;
        console.log("Authenticated User:", req.user);
        next();
    });
};

module.exports = authenticateToken;
