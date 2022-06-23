// import jsonwebtoken for authorisation
const jwt = require("jsonwebtoken");
const config = require("config");


//middleware: Token verification and payload serilisation
function authoriseToken(req, res, next) {
    // access the request headers to look for the token
    const authHeader = req.headers["authorization"];
    // req.headers['authorization'] : "Bearer 'kjhddjhfdhjfhj'"
    // of we have authHeader then return the token
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401).json({ message: 'token not found'}); // no token
    // As we are here, means we have a token, we need to verify it:
    jwt.verify(token, config.get('jwt_secret.access'), (err, user) => {
      if (err) return res.status(403).json({message: "Forbidden"}); //Forbidden
      req.user = user;
      next();
    });    
  }

  module.exports = {authoriseToken};