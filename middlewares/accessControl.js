const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant('user')                    
    .createOwn('user')             
    .deleteOwn('user')
  .grant('admin')                   
    .extend('user')     
    .readAny('user')            
    .updateAny('user')  
    .deleteAny('user');

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = ac.can(req.role)[action](resource);
            if (!permission.granted) {
                return res.status(403).json("You have no granted permission to access this page");
            }
            next()
        } catch (error) {
            return res.status(403)
        }
    }
}