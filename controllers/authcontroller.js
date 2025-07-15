const express = require('express');
const router = express.Router( );
const bcrypt = require('bcrypt')
const User = require('../models/User')


router.get('/',(req, res)=>{
    res.send ('Work')
})

// SIGN UP VIEW
router.get('/sign-up',(req, res)=>{
    res.render('auth/sign-up.ejs')
})

// POST A NEW USER TO THE DATABASE WHEN THE FORM IS SUBMITTED
router.post('/sign-up', async(req, res) => {

    // get data from the form (req.body)
    // check if someone already exists
    console.log(req.body)
    const userInDatabase = await User.findOne({username: req.body.username})
    if (userInDatabase){
        return res.send('Username already taken. ')
    }
    // check that password and confirmPassward are the same 
    if (req.body.password !== req.body.confirmPassword){
        return res.send('Password and confirm password must match.')
    }
    // Hashed password
    // 10 time for loading the server
    // check for password complexity (LEVEL UP)
    // check if someone already exists

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    console.log(hashedPassword)
    const nweUser = await User.create(req.body)
    res.send(`Thanks for siging up ${nweUser.username}`)
})

// SIGN-IN VIEW
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})

//POST TO SIGN THE USER IN (CREATE SESSION)
router.post('/sign-in', async(req,res) => {
    // check if user already exists in database
const userInDatabase = await User.findOne({username: req.body.username})

    // if this not exist so they need to sign-up
    if (!userInDatabase){
        return res.send('Login failed. Please try again. ')
    }

    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
})

module.exports = router;