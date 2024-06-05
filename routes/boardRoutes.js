const express = require("express");
const router = express.Router();
const { getBoard, getBoardOne } = require("../controllers/boardController")

router.get(["/", "/home"], getBoard);
router.get("/board/:id", getBoardOne);

// 임시 데이터 저장
// Board.insertMany([
//     {
//         title: "제목1",
//         body: "내용1",
//     },
//     {
//         title: "제목2",
//         body: "내용2",
//     },
//     {
//         title: "제목3",
//         body: "내용3",
//     },
// ]);

module.exports = router;