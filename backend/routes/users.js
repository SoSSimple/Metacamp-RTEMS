const express = require("express");
const router = express.Router();
// const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");
const ctrlUsers = require("../controller/ctrl.users.js");

router.use(ctrlUsers.userSession);

// GET /users 회원 조회
router.get("/", ctrlUsers.getUsers);

// GET /users/log 유저가 장비를 사용한 이력 가져오기
// body -> id
router.get("/log", ctrlUsers.getUserLog);

// POST /users/signup 회원 가입
router.post("/signup", ctrlUsers.signUser);

// DELETE /users/remove 회원 탈퇴
router.delete("/remove", ctrlUsers.removeUser);

// POST /users/edit/:id 회원 정보 전체 수정
router.patch("/edit/:id", ctrlUsers.editUser);

// POST /users/login
router.post("/login", ctrlUsers.loginUser);

// POST /users/logout
router.post("/logout", ctrlUsers.logoutUser);

module.exports = router;
