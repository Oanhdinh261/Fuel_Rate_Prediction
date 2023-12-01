const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const router = express.Router();
const db = require('../routes/db-config');


router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public/" });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public/" });
});

router.get("/profile", loggedIn,(req, res) => {
    res.sendFile("profile.html", { root: "./public/" });
});

router.get("/quote", loggedIn,(req, res) => {
    res.sendFile("quote.html", { root: "./public/" });
});

router.get("/quote-history", loggedIn, (req, res) => {

    const sql = 'SELECT * FROM quotes WHERE user_id = ? ORDER BY created_at DESC'; // Update 'created_at' as per your table

    db.query(sql, [req.user.id], (err, quotes) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving quote history.');
        }

        // If using EJS or similar view engine
        res.render('quote-history', { quotes });

        // If using SPA or AJAX (JSON response)
        // res.json({ quotes });
    });
});


module.exports = router;
