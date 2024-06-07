require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(methodOverride("_method"));

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/boardRoutes"));
app.use("/", require("./routes/adminRoutes"));
app.use("/login", require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));

// app.get("/", (req, res) => {
//     res.status(200).send("Hello Node!");
// });

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중`);
});