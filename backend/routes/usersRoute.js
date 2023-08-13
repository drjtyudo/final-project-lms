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
const { authenticateToken } = require("../middleware/middleware.js");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users/regist", userRegister);
router.post("/users/login", userLogin);
router.get("/users/me", authenticateToken, checkLogin);
router.delete("/users/logout", authenticateToken, userLogout);
router.get("/users/:userId", getUserById);
router.patch("/users/update/:userId", updateUser);

module.exports = router;
