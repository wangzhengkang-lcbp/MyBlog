const visitorSchema = require("../Schema/visitorSchema")
const {db} = require('../Schema/db')

const VisitorTable = db.model('visitor', visitorSchema)




module.exports = VisitorTable
