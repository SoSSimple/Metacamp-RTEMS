const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/ctrl.users.js");

// GET /users 회원 조회
router.get("/", ctrlUsers.getUsers);

// POST /users/signup 회원 가입
router.post("/signup", ctrlUsers.signUser);

// DELETE /users/remove 회원 탈퇴
router.delete("/remove", ctrlUsers.removeUser);

// POST /users/edits 회원 정보 전체 수정
router.post("/edits", ctrlUsers.editUser);

// PATCH /users/edit 회원 정보 일부 수정
router.patch("/edit", ctrlUsers.editUser);

// POST /users/login
router.post("/login", ctrlUsers.loginUser);

// POST /users/logout
router.post("/logout", ctrlUsers.logoutUser);

module.exports = router;
