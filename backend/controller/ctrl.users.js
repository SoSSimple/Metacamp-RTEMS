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
    return next(error);
  }
};

const getUserLog = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: req.body.id });
    if (user) {
      // await user.addDeviceUserLogs(parseInt(req.body.deviceId, 10));
      const resultUserLogs = await user.getDeviceUserLogs({
        where: req.body.id,
      });
      res.status(201).json({ resultUserLogs });
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const signUser = async (req, res, next) => {
  try {
    const { name, userId, password, email } = req.body;
    const exUser = await User.findOne({ where: { userId } });
    if (!exUser) {
      // 중복된 아이디가 없다면
      console.log(password,'test***********')
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        name,
        userId,
        password: hash,
        email,
      });
      res.status(201).json({
        data: {
          success: true,
          msg: "가입 성공",
        },
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
    return next(error);
  }
};

const removeUser = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const result = await User.destroy({ where: { userId } });
    res.status(201).json({
      data: {
        success: true,
        msg: "회원탈퇴 성공",
        result,
      },
    });
  } catch (error) {
    console.error(`removeUser error: ${error}`);
    return next(error);
  }
};

const editUser = async (req, res, next) => {
  const { userId, name, password, role } = req.body;
  const id = req.params;
  console.log(id);
  try {
    const hash = await bcrypt.hash(password, 12);
    await User.update(
      {
        userId,
        name,
        password: hash,
        role,
      },
      { where: id }
    );
    res.status(201).json({
      data: {
        succes: true,
        msg: "회원정보 수정 성공",
      },
    });
  } catch (error) {
    console.error(`editUser error: ${error}`);
    return next(error);
  }
};

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
      let token = "";
      token = jwt.sign(
        {
          userId: user.userId,
          password: user.password,
        },
        "secretkey",
        {
          expiresIn: "10m",
        }
      );
      res.setHeader("token", token);
      return res.status(201).json({ data: { msg: "로그인 성공", token } });
    });
  })(req, res, next);
};

const logoutUser = (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).json({
    data: {
      success: true,
      msg: "로그아웃 성공",
    },
  });
};

module.exports = {
  getUsers,
  getUserLog,
  signUser,
  removeUser,
  editUser,
  loginUser,
  logoutUser,
};
