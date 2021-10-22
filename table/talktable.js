const talkSchema = require("../Schema/talkSchema")
const {db} = require('../Schema/db')

const TalkTable = db.model('talk', talkSchema)




module.exports = TalkTable
