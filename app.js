const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();
const port = 3000;

dbConnect();

app.get("/", (req, res) => {
    res.status(200).send("Hello Node!");
});

app.use("/contacts", require("./routes/contactRountes"));
app.use(express.json());

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중`);
});