const UserSchema = require("../Schema/userSchema")
const {db} = require('../Schema/db')

const UserTable = db.model('user', UserSchema)




module.exports = UserTable
