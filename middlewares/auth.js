const jwt = require("jsonwebtoken");
const config = process.env;

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.userId = user.userId;
        req.role = user.role;
      next()
    })
};

module.exports = auth;