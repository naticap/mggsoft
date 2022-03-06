const auth = require("../controllers/auth.js");  
var router = require("express").Router();

module.exports = app => {
    router.post("/login", auth.login);
    router.post("/register", auth.register);

    app.use(router);
};