const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, password: Npassword } = req.body;
    if (!username || !Npassword) { // Fixed the variable name "password" to "Npassword"
        return res.json({ status: "error", error: "Please enter your username and password" });
    } else {
        console.log(username);
        db.query('SELECT username FROM users WHERE username = ?', [username], async (err, result) => {
            if (err) {
                throw err;
            }
            if (result[0]) {
                return res.json({ status: "error", error: "Username has already been registered" });
            } else {
                const hashedPassword = await bcrypt.hash(Npassword, 8); // Corrected the variable name to "hashedPassword"
                console.log(hashedPassword);
                db.query('INSERT INTO users SET ?', { username: username, password: hashedPassword }, (error, results) => {
                    if (error) {
                        throw error;
                    }
                    return res.json({ status: "success", success: "User has been registered" }); // Removed extra parentheses
                });
            }
        });
    }
};

module.exports = register;
