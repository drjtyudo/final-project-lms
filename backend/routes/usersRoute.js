const express = require("express");

const {
  getUsers,
  userRegister,
  updateUser,
  getUserById,
  userLogin,
  userLogout,
  checkLogin,
} = require("../controllers/usersController.js");
const { verifyToken } = require("../middleware/middleware.js");
const { refreshToken } = require("../helper/refreshToken.js");

const router = express.Router();

router.get("/token", refreshToken);
router.get("/users", verifyToken, getUsers);
router.post("/users/regist", userRegister);
router.post("/users/login", userLogin);
router.get("/users/me", verifyToken, checkLogin);
router.delete("/users/logout", userLogout);
router.get("/users/:userId", getUserById);
router.patch("/users/update/:userId", updateUser);

module.exports = router;
