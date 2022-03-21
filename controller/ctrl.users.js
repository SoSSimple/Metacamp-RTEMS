const User = require("../models/users");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const exUser = await User.findAll({});
    res.status(200).json({
      data: {
        success: true,
        msg: null,
        exUser,
      },
    });
  } catch (error) {
    console.error(`getUsers error: ${error}`);
  }
};

const signUser = async (req, res, next) => {
  try {
    const { name, userId, password, email } = req.body;
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
  } catch (error) {
    console.error(`signUser error: ${error}`);
  }
};

const removeUser = async (req, res) => {};
const editsUser = async (req, res) => {};
const editUser = async (req, res) => {};

const loginUser = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(`authError ${authError}`);
      return next(authError);
    }
    if (!user) {
      console.log(user);
      return res.send("<h1>id 혹은 password가 일치하지 않음</h1>");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(`loginError ${loginError}`);
        return next(loginError);
      }
      return res.status(201).json({ msg: "로그인 성공" });
    });
  })(req, res, next);
};
const logoutUser = async (req, res) => {
  try {
    req.logout();
    req.session.destroy();
    return res.status(200).json({
      data: {
        success: true,
        msg: "로그아웃 성공",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUsers,
  signUser,
  removeUser,
  editsUser,
  editUser,
  loginUser,
  logoutUser,
};
