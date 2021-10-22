const mongoose = require('mongoose')

let URL = 'mongodb://localhost:27017/blog'
//db是create方法返回的连接的数据库对象 可以控制多个数据库
//接收db方便后续建表
const db = mongoose.createConnection(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//检测是否链接成功
db.on('open', () => {
  console.log('数据库连接成功:' + URL)
})

db.on('error', () => {
  console.log('数据库连接失败：' + URL)
})


//导出
module.exports = {
  db, // db跟连接数据库是相关
  Schema: mongoose.Schema //提取mongoose中的Schema属性
}
