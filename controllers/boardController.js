const asynchandler = require("express-async-handler");
const mainLayout = "../views/layouts/main.ejs";
const Board = require("../models/boardModel");

const getBoard = asynchandler(async (req, res) => {
    const locals = {
        title: "Home",
    };

    const data = await Board.find({});
    res.render("boardList", { locals, data, layout: mainLayout });
});

const getBoardOne = asynchandler(async (req, res) => {
    const data = await Board.findOne({ _id: req.params.id });
    res.render("boardOne", { data, layout: mainLayout });
})



module.exports = { getBoard, getBoardOne };