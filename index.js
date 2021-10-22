const Koa = require('koa')
const app = new Koa

const cors = require('@koa/cors')
app.use(cors({//允许跨域请求
  origin: "http://localhost:8080", //只允许当前地址进行跨域访问
  credentials: true
}))

const body = require('koa-body')
app.use(body())

const koaStatic = require('koa-static')
app.use(koaStatic("./public"))

const router = require("./routers/router")

//提前配置好session
const session = require('koa-session')
// const {db} = require('./Schema/db')
// const SessionStore = require('./Schema/sessionStore')
app.keys = ['userInfo']
const CONFIG = {
  key: 'userInfo',
  maxAge: 36e5, // 一小时的有效期
  overwrite: true,
  httpOnly: true,
  singed: true,
  rolling: true,
  // store: new SessionStore({
  //   collection: 'navigation', //数据库集合
  //   connection: db,     // 数据库链接实例
  //   expires: 86400, // 默认时间为1天
  //   name: 'session' // 保存session的表名称
  // })
}

// 处理类似404请求
app.use(async (ctx, next) => {
  await next()
  if (ctx.status >= 400) {
    ctx.body = ctx.status
  }
})


app  //代码最后写这个固定写法
  .use(session(CONFIG, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)