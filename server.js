const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL)

const usersRouter = require("./routers/usersRouter")

app.set("view engine", "ejs")
app.use("/static", express.static(__dirname + "/static"))
app.use(express.urlencoded({ extended: false }))

app.use("/users", usersRouter)

app.get("/", (req, res) => res.redirect("/users/login"))

app.listen(process.env.PORT || 5000)