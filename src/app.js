const express = require("express")
const app = express()

const database = require('./model/database')
database.connect()

const bodyParser = require("body-parser")

//rotas
const index = require("./routes/index")
const contatos = require("./routes/contatosRoute")

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*")
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})
//middleware
app.use(bodyParser.json())
app.use("/", index)
app.use("/contatos", contatos)

module.exports = app
