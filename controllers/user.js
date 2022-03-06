const bcrypt = require("bcryptjs");
const db = require("../models");
const { getPagination, getPagingData } = require("../services/paginate");
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

exports.findAll = async (req, res) => {
    try {
      if(req.params.id) {
        return this.findByPk(req, res);
      }

      const {page, size, userName} = req.query;
      var condition = userName ? { userName: { [Op.like]: `%${userName}%` } } : null;
      const { limit, offset } = getPagination(page, size);
 
      const users = await User.findAndCountAll({
        where: condition,
        limit,
        offset
      });

      const ret = limit ? getPagingData(users, page, limit) : users;

      return res.json(ret);
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

exports.findByPk = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if(!user) return res.json("User not found");
      return res.json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if(req.body.password) {
      const password = await bcrypt.hash(req.body.password, 10);
      req.body.password = password;
    }
    await user.update(req.body);

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    return res.json("Succesfully delete user. id: " + user.id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await User.destroy({
      truncate: true,
    });
    return res.json("Successfully delete all user records");
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};