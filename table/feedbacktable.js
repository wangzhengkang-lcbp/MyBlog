const feedbackSchema = require("../Schema/feedbackSchem")
const {db} = require('../Schema/db')

const FeedbackTable = db.model('feedback', feedbackSchema)




module.exports = FeedbackTable
