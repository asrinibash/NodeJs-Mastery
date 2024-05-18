const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const {restrictTo} = require("../middleware/auth");

router.get("/", restrictTo(["Normal"]), async (req, res) => {
    // if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({createdBy: req.user._id});
    res.render("home", {
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("SignUp");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
