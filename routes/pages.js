const express = require("express");
const loggedIn = require("../controllers/loggedIn")
const router = express.Router();

router.get("/", loggedIn, (red, res)=> {
    res.render("index");

});

router.get("/register", (red, res)=> {
    res.sendFile("register.html", {root:"./public"});
});

router.get("/login", (red, res)=> {
    res.sendFile("login.html", {root:"./public/"});
});

module.exports = router;