const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const mainLayout = "../views/layouts/main";
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const register = (req, res) => {
    const locals = {
        title: "회원가입 페이지",
    };

    res.render("register", { locals, layout: mainLayout });
}

const registerUser = asyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
    });
    res.redirect("/admin");
})

const getUser = asyncHandler(async (req, res) => {
    const locals = {
        title: "User",
    };

    const data = await User.find({});
    res.render("getUser", { locals, data, layout: adminLayout });
})

module.exports = { register, registerUser, getUser };