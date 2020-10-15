const express = require('express');
const { model } = require('mongoose');
const passport = require('passport');
const router = express.Router();

// @description : authenticate with google
// @route: GET / auth/ google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @description : Google auth callback
// @route: GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req,res) => {
    res.redirect('/dashboard');
})

// @description : Logout user
// @route: GET 
router.get('/logout', (req,res) => {
    req.logOut()
    res.redirect('/')
})


module.exports = router