const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../services/logger")(module);
const User = db.User;
const Op = db.Sequelize.Op;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
          return res.status(400).send("All input is required");
        }

        const user = await User.findOne({ where: {
            email: email
        } });

        console.log("user: ", user);
    
        if (user && (await bcrypt.compare(password, user.password))) {

            console.log("show test");
            const token = jwt.sign(
                { userId: user.Id, role: user.role },
                    process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.TOKEN_EXPIRED,
                }
            );
            
            let newUser = {...user, token: token}
            await user.update(newUser);

            return res.status(200).json(token);
        }

        return res.status(400).send("Invalid Credentials");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exists = await User.findOne({ 
            where: {
                email: email,
            }
        });
    
        if (exists) {
          return res.status(409).send("Email already used by another person. Please use another email");
        }

        let newUser = {...req.body, password: await bcrypt.hash(password, 10)}
        const user = await User.create(newUser);

        const token = jwt.sign(
          { userId: user.Id, role: user.role },
          process.env.TOKEN_SECRET,
          {
            expiresIn: process.env.TOKEN_EXPIRED,
          }
        );

        await user.update({...user, token: token});
        
        logger.info(`${user.id} Successfully registered`);
    
        res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

