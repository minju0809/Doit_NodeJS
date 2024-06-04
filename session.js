const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

app.use(
  session({
    secret: "secret code", // 세션 비밀 키
    resave: false, // 변경할 내용이 없으면 다시 저장하지 않음
    saveUninitialized: true, // 초기화되지 않은 세션 저장
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECT}), // 몽고DB에 저장
    cookie: { maxAge: 60 * 60 * 24 * 1000 }, // 쿠키 유효 기간 24시간(밀리초 단위)
  })
);

app.get("/", (req, res) => {
  if(req.session.count) {
    req.session.count++;
    res.send(`${req.session.count}번째 방문입니다.`);
  } else {
    req.session.count = 1;
    res.send("첫 번째 방문입니다.");
  }
})

app.get("/session", (req, res) => {
  res.send(`session ID: ${req.sessionID}`);
});

app.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.log(err);
    } else {
      res.clearCookie("connect.sid");
      res.send("세션 삭제");
    }
  });
});

app.listen(5001, () => {
  console.log("서버 실행 중");
});