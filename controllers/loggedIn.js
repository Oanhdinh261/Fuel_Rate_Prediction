const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered) {
        return res.status(401).json({ error: 'No authentication token found' });
    }

    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRETE);
        console.log("Decoded JWT:", decoded);
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (err || !result.length) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            req.user = result[0];
            console.log("User from DB:", req.user);
            return next();
        });
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
};


module.exports = loggedIn;
