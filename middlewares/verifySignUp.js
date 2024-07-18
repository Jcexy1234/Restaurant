const Uesr = require("../modles/user.model");
const Role = require("../modles/role.model");
const { where, Op } = require("../Restaurant/models/db");
const User = require("../Restaurant/models/user.model");

checkDuplicateUsernameOrEmail = async (req,res,next) =>{
    //check user
    await Uesr.findOne({
        where : {
            username : req.body.username
        }
    }) .then((user)=>{
        if (user) {
            res.status(400) .send ({ message : "Failed! Username is alredy in use!"});
            return;
        }
        //chck email
        User.findOne({
            where : {
                email: req.body.email,
            },
        }) .then((user) => {
            if (user) {
                res.status(400).send ({ message : "Failed! Email is alredy in use!"});
                return;
            }
            next();
        });
    });
};

//check roles
checkRolesExisted = async (req,res,next)=>{
    if(req.body.roles) {
        Role.findAll({
            where: {
                name : {[Op.or]:req.body.roles},
            },
        }) .then((roles)=>{
            if (roles.lenght !== req.body.roles.lenght) {
                res.status(400).send({ message: "Failed! Role does not exist"});
                return;
            }
        })

    } else{
        next();
    }
}

const verifySignUp = {
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;