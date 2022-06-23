const express = require("express");

const {register, login} = require('../controllers/userControllers.js')
const {check} = require('express-validator'); 

const { authoriseToken } = require('../middlewares/accessAuthorization.js')

const users = require("../datasets/userData.js");

function getPosts(req, res) {
    // res.json(users.filter((user) => user.name === req.user.user)); 
// res.json(users.map((user) => req.user)); 
res.json(users);
}

const router = express.Router();


//// ------------------------- TASK !!!!! ----------------------------------

// coding our login, registration routes 
/**
 * @route GET /users
 * @description get all users
 * @access Private
 */
//task: please add middleware to lock this route + does e mail already exist? 
// router.get('/users', (req, res) => {
//     res.status(200).json(users)
// })

// router.get('/users', authoriseToken, getPosts);
router.get('/users', authoriseToken, (req, res) => {
    res.status(200).json(users.filter(user => user.id == req.user.id));
});

router.get('/users2', (req, res) => {
    res.json(users);
});
// ----------------------------------------------------------------------------

/**
 * @route POST /register 
 * @desc  Register a user 
 * @access Public
 */

 router.post('/register',
 check('name', 'Name is required').notEmpty(), // middleware check name
 check('email', 'Please include a valid email').isEmail(), // middleware check email
 check('password', 'Please enter a password with 6 or more characters').isLength({min:6}), // middleware check password
 register // controller function 
 )
 

 router.post('/login', login) 
 
 module.exports = router