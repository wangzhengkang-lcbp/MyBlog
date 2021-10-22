//拿到Schema属性
const { Schema } = require('./db')

const UserSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false //默认非管理员
    },
    head_photo: {
        type: String,
        default: "/1.jpg"
    }
}, {
    versionKey: false // 去掉数据库中的 __v 属性
})

module.exports = UserSchema