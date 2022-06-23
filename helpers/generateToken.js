const jwt = require("jsonwebtoken");
const config = require('config');


/**
 * 
 * @param {*} user -- the payload of the jwt signitature 
 * @returns {String} -- the token
 */


const generateToken = (user) => {
// const payload = {
//     user
// }

return jwt.sign(
    user, 
    config.get('jwt_secret.access'),
        { expiresIn: '60s' },
       );

} 



module.exports = generateToken;