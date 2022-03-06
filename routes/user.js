const user = require("../controllers/user.js");  
const { grantAccess } = require("../middlewares/accessControl.js");
var router = require("express").Router();

module.exports = (app, req, res) => {
    router.post("/", grantAccess('createAny', 'user'), user.create);
    router.get("/:id?", grantAccess('readAny', 'user'), user.findAll);
    router.patch("/:id", grantAccess('updateAny', 'user'), user.update);
    router.delete("/:id", grantAccess('deleteAny', 'user'), user.delete);

    app.use('/user', router);
};