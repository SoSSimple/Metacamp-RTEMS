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
    const user = await User.findOne({ where: req.body.userId });
    if (user) {
      const resultUserLogs = await user.getDeviceUserLogs({
        where: req.body.userId,
      });
      res.status(201).json({
        data: {
          success: true,
          msg: "유저의 장비 로그 가져오기",
          resultUserLogs,
        },
      });
    } else {
      res
        .status(404)
        .json({ data: { success: false, msg: "존재하지 않는 회원" } });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const signUser = async (req, res, next) => {
  try {
    const { name, userId, password, department, role } = req.body;
    const exUser = await User.findOne({ where: { userId } });
    if (!exUser) {
      // 중복된 아이디가 없다면
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        name,
        userId,
        password: hash,
        department,
        role,
      });
      return res.status(201).json({
        data: {
          success: true,
          msg: "가입 성공",
        },
      });
    } else {
      // 중복되는 아이디가 있으면
      return res.status(401).json({
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
  // console.log(req.body);
  try {
    const { userId } = req.body;
    console.log(userId);
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
  // TODO: params로 받아오는 값을 body로 수정해서 id와 password가 일치하는지 비교한 후 맞으면 수정, 아니면 에러 처리
  const { userId, name, password, role, department, id } = req.body;
  // const paramUserId = req.params.id;
  const salt = 12;
  try {
    if (password) {
      console.log("edit", password);
      // 수정 폼에 패스워드를 입력했을 때
      const hash = await bcrypt.hash(password, salt);
      const user = await User.update(
        {
          userId,
          name,
          password: hash,
          department,
          role,
        },
        { where: { id } }
      );
      res.status(201).json({
        data: {
          succes: true,
          msg: "회원정보 수정 성공",
          user,
        },
      });
    } else {
      // 수정 폼에 패스워드를 입력하지 않았을 때
      console.log("password nothing");
      const user = await User.update(
        {
          userId,
          name,
          department,
          role,
        },
        { where: { id } }
      );
      res.status(201).json({
        data: {
          succes: true,
          msg: "회원정보 수정 성공",
          user,
        },
      });
    }
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
      return res
        .status(401)
        .json({ data: { success: false, msg: info.message } });
    }
    req.session.user = {
      userId: user.userId,
      name: user.name,
      department: user.department,
      role: user.role,
    };

    if (req.session.user) {
      return req.login(user, (loginError) => {
        const { userId, name, role, department } = user;
        if (loginError) {
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
        return res.status(201).json({
          data: {
            success: true,
            msg: "로그인 성공",
            userId,
            name,
            role,
            department,
          },
        });
      });
    } else {
      console.log("session 등록 실패");
      res.send("session 등록 실패");
    }
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
