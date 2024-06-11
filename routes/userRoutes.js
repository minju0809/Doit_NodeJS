const express = require("express");
const router = express.Router();
const { register, registerUser, getUser } = require("../controllers/userController");
const checkAdmin = require("../middlewares/checkAdmin");

router.route("/register").get(register).post(registerUser);

router.route("/getUser").get(checkAdmin, getUser)


module.exports = router;