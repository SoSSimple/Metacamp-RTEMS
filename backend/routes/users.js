const express = require("express");
const router = express.Router();
// const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");
const ctrlUsers = require("../controller/ctrl.users.js");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");

const validte = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ msg: errors.array()[0].msg });
};

router.use(ctrlUsers.userSession);

// GET /users 회원 조회
router.get("/", ctrlUsers.getUsers);

// GET /users/log 유저가 장비를 사용한 이력 가져오기
// body -> id
router.get("/log", ctrlUsers.getUserLog);

// POST /users/signup 회원 가입
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("이름 입력은 필수")
      .isLength({ min: 3 })
      .withMessage("이름은 세 글자 이상"),
    body("userId")
      .trim()
      .notEmpty()
      .withMessage("아이디 입력은 필수")
      .isLength({ min: 3 })
      .withMessage("아이디는 세 글자 이상")
      .custom((value) => {
        return User.findOne({ where: { userId: value } }).then((user) => {
          if (user) {
            return Promise.reject("ID already in use");
          }
        });
      }),
    validte,
  ],
  ctrlUsers.signUser
);

// DELETE /users/remove 회원 탈퇴
router.delete("/remove", ctrlUsers.removeUser);

// POST /users/edit/:id 회원 정보 전체 수정
router.patch("/edit/:id", ctrlUsers.editUser);

// POST /users/login
router.post("/login", ctrlUsers.loginUser);

// POST /users/logout
router.post("/logout", ctrlUsers.logoutUser);

module.exports = router;
