const articleSchem = require("../Schema/articleSchem")
const {db} = require('../Schema/db')

const ArticleTable = db.model('article', articleSchem)




module.exports = ArticleTable
