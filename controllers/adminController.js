const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Board = require("../models/boardModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const admin = (req, res) => {
    const locals = {
        title: "관리자 페이지",
    };

    res.render("admin/index", { locals, layout: adminLayout2 });
}

const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);

    res.cookie("token", token, { hpptOnly: true });

    res.redirect("/allBoards");
});

// const registerUser = asyncHandler(async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//         username: req.body.username,
//         password: hashedPassword,
//     });
//     res.json(`user created: ${user}`);
// })

const allBoards = asyncHandler(async (req, res) => {
    const locals = {
        title: "Boards",
    };

    const data = await Board.find().sort({ updatedAt: "desc", createAt: "desc" });
    res.render("admin/allBoards", {
        locals,
        data,
        layout: adminLayout,
    });
});

const boardAdd = asyncHandler(async (req, res) => {
    const locals = {
        title: "게시물 작성",
    };
    res.render("admin/boardAdd", {
        locals,
        layout: adminLayout,
    });
});

const boardCreate = asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    const newBoard = new Board({
        title: title,
        body: body,
    });

    await Board.create(newBoard);

    res.redirect("/allBoards");
})

const boardEdit = asyncHandler(async (req, res) => {
    const locals = {
        title: "게시물 편집",
    };

    const data = await Board.findOne({ _id: req.params.id });
    res.render("admin/edit", {
        locals,
        data,
        layout: adminLayout,
    });
});

const boardUpdate = asyncHandler(async (req, res) => {
    await Board.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        createAt: Date.now(),
    });

    res.redirect("/allBoards");
});

const boardDelete = asyncHandler(async (req, res) => {
    await Board.deleteOne({ _id: req.params.id });
    res.redirect("/allBoards");
})

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = {
    admin,
    loginAdmin,
    allBoards,
    logout,
    boardAdd,
    boardCreate,
    boardEdit,
    boardUpdate,
    boardDelete
};