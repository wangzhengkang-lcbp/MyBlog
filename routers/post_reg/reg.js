const UserTable = require("../../table/usertable")

const reg = async ctx => {
    console.log(ctx.request.body);
    let { user, password } = ctx.request.body
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)) {
        let userDoc = await UserTable.findOne({ user });
        if (userDoc) {
            //有存在相同用户数据
            ctx.body = {
                code: 2,
                message: "用户已存在"
            }
        } else {
            await UserTable.create({ user, password });
            ctx.body = {
                code: 0,
                message: "注册成功"
            }
        }
    } else {
        ctx.body = {
            code: 1,
            message: "你发过来的数据格式不规范"
        }
    }



    // ctx.body = { data: "okk" }
}


module.exports = reg