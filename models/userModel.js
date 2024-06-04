const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true, // 필수 속성으로 설정
        unique: true, // 중복할 수 없도록 설정
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", UserSchema);