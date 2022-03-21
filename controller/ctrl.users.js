const data = require("../data/users");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  res.status(200).json({
    data: {
      success: true,
      msg: null,
      userId: "testId",
      password: "testPwd",
      email: "test@test.com",
      role: "worker",
    },
  });
  next();
};

const signUser = async (req, res, next) => {
  try {
    const { name, userId, password, email, worker } = req.body;
    const exUser = await User.findOne({ where: { userId } });
    if (!exUser) {
      // 중복된 아이디가 없다면
      res.status(201).json({
        data: {
          success: true,
          msg: "가입 성공",
        },
      });
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        name,
        userId,
        password: hash,
        email,
      });
    } else {
      // 중복되는 아이디가 있으면
      res.status(401).json({
        data: {
          success: false,
          msg: "이미 가입된 회원",
        },
      });
    }
  } catch (error) {}
};

const removeUser = async (req, res) => {};
const editsUser = async (req, res) => {};
const editUser = async (req, res) => {};

module.exports = {
  getUsers,
  signUser,
  removeUser,
  editsUser,
  editUser,
};
