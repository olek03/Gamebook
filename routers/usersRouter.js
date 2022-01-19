const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../javascripts/authModel")
const userLogin = require("../javascripts/getUserLogin")
const getPw = require("../javascripts/getPassword")
const getLogin = require("../javascripts/getLogin")

const createRouter = require("./userRouters/createRouter")
const searchRouter = require("./userRouters/searchRouter")
const loginRouter = require("./userRouters/loginRouter")
const editRouter = require("./userRouters/editRouter")
const postsRouter = require("./userRouters/postsRouter")
const viewRouter = require("./userRouters/viewRouter")
const likeRouter = require("./userRouters/likeRouter")
const commentRouter = require("./userRouters/commentRouter")
const gamesRouter = require("./userRouters/gamesRouter")

router.use("/new", createRouter)
router.use("/search", searchRouter)
router.use("/login", loginRouter)
router.use("/edit", editRouter)
router.use("/posts", postsRouter)
router.use("/view", viewRouter)
router.use("/like", likeRouter)
router.use("/comment", commentRouter)
router.use("/games", gamesRouter)


router.get("/list/:id", async (req, res) => auth(req.url, res, 12))

router.get("/:id", async (req, res) => auth(req.url, res, 1))


module.exports = router