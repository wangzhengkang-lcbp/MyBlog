//拿到Schema属性
const { Schema } = require('./db')

const linkSchema = new Schema({ //友链信息表规则
    name:String, //友链名称
    home:String, //友链地址
    logo:String, //图标
    describe:String //描述
});
module.exports = linkSchema