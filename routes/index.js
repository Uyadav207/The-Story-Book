const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story');
// @description : login/landing page
// @route: GET
router.get('/', ensureGuest , (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @description : Dashboard
// @route: GET
router.get('/dashboard', ensureAuth,  async (req,res) => {

    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', { 
            name: req.user.firstName,
            stories
         })
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
   
    
})


module.exports = router