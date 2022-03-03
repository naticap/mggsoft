const user = require("../controllers/user.js");  
var router = require("express").Router();

module.exports = app => {
    router.post("/", user.create);
    router.get("/:id?", user.findAll);
    router.patch("/:id", user.update);
    router.delete("/:id", user.delete);

    app.use('/user', router);
};