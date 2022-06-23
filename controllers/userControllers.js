const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const generateToken = require('../helpers/generateToken.js')

const users = require('../datasets/userData.js');

const register = async (req, res) => {
    // first validation , santization , authentication
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { name, email, password } = req.body;

    /*
    * Opt. find a current user with the same email
    *  if found then send error : email is taken
    *  if not found go to next step
    */
    
    const Id = users.length;
    const salt = await bcrypt.genSalt(10); // best parctice 
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
        id: Id,
        name: name,
        email: email,
        password: hashedPassword
    };
    users.push(user);

    // second authorisation : jwt
        // perpare a payload
    const payload = {
            id: user.id,
            name: user.name
        };

    const token = generateToken(payload);

    res.json({ //this is the return of the controller function 
      token: token
    });


      // sign and genrate the token 
    // jwt.sign(
    //     payload,
    //     config.get('jwt_secret.access'),
    //     { expiresIn: '60s' },
    //     (err, token) => {
    //         if (err) return res.status(403).json('access denied');
    //         res.json({
    //             token: token,
    //             users: users
    //         });
    //     }
    // );

    
    

}

const login = async (req, res) => {
    const {email, password } = req.body;
    // find user by email
    const user = users.find(user => user.email == email);
    if (!user) return res.status(404).json({
        message: `1 Either email or password is not correct !!!`
    });
    // check password
    
    if (!password) {
        return res.status(400).json({ message: 'No password supplied' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(404).json({
        message: `2 Either email or password is not correct !!!`
    });
    };
    
    // gnerate access token
    
    res.status(200).json({
        token: 'our task to generate it !!',
        message: 'you are logged in !!!'
    });
   
}


module.exports = { register , login};