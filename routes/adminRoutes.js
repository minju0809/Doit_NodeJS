const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const {
    admin,
    loginAdmin,
    allBoards,
    logout,
    boardAdd,
    boardCreate,
    boardEdit,
    boardUpdate,
    boardDelete
} = require("../controllers/adminController");
const checkAdmin = require("../middlewares/checkAdmin");

router.use(cookieParser());

router.route("/admin").get(admin).post(loginAdmin);

router.route("/allBoards").get(checkAdmin, allBoards);

router.route("/logout").get(logout);

router.route("/boardAdd").get(checkAdmin, boardAdd).post(checkAdmin, boardCreate);

router.route("/edit/:id").get(checkAdmin, boardEdit).put(checkAdmin, boardUpdate)
    
router.route("/delete/:id").delete(checkAdmin, boardDelete);

// router.get("/register", admin).post("/register", registerUser);

module.exports = router;