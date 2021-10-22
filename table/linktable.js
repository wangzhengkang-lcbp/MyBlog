const linkSchema = require("../Schema/linkSchema")
const {db} = require('../Schema/db')

const LinkTable = db.model('link', linkSchema)




module.exports = LinkTable
