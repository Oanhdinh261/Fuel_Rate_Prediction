const express = require("express");
const register = require("./register");
const login = require("./login");
const saveProfile = require("./profile");
const loggedIn = require("../controllers/loggedIn");
const calculateQuote = require("./calculate-quote");
const submitQuote = require("./submit-quote");
const db = require('../routes/db-config');


const logout = require("./logout");

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/profile", loggedIn, saveProfile)
router.post("/calculate-quote", loggedIn, calculateQuote);
router.post("/submit-quote", loggedIn, submitQuote);
// In your routes file
router.get("/api/get-address", loggedIn, (req, res) => {

    const sql = "SELECT address1, address2, city, state, zipcode FROM user_profiles WHERE user_id = ?";
    db.query(sql, [req.user.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving address.");
        }
        if (results.length > 0) {
            const fullAddress = `${results[0].address1}, ${results[0].address2}, ${results[0].city}, ${results[0].state}, ${results[0].zipcode}`;
            res.json({ address: fullAddress });
        } else {
            res.status(404).send("Address not found.");
        }
    });
});




//router.get("/logout", logout)

module.exports = router;