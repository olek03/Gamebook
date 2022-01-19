const express = require("express")
const router = express.Router()
const auth = require("../../javascripts/authModel")
const getPw = require("../../javascripts/getPassword")
const getLogin = require("../../javascripts/getLogin")
const User = require("../../models/User")

router.get("/mario/:id", (req, res) => auth(req.url, res, 9))

router.get("/mario/points/:id", async (req, res) => {
    if (await auth(req.url, res, 0)) {
        await User.updateOne({ name: getLogin(req.url) }, { $inc: { points: 40 } })
        const user = await User.find({ name: getLogin(req.url) })
        await User.updateOne({ name: getLogin(req.url) }, { $set: { "posts.$[].points": user[0].points } })
        await User.updateMany({ "posts.$[].comments.$[].nickname": getLogin(req.url) }, { $set: { "posts.$[].comments.$[elem].points": user[0].points } }, { arrayFilters: [{ "elem.nickname": getLogin(req.url) }] })
        await User.updateMany({ "comments.$[].nickname": getLogin(req.url) }, { $set: { "comments.$[elem].points": user[0].points } }, { arrayFilters: [{ "elem.nickname": getLogin(req.url) }] })

        const fullId = `@${getLogin(req.url)}?${getPw(req.url)}`
        res.redirect(`/users/${fullId}`)
    }
})

router.get("/tetris/:id", (req, res) => auth(req.url, res, 10))

router.get("/tetris/points/:id", async (req, res) => {
    if (await auth(req.url, res, 0)) {
        await User.updateOne({ name: getLogin(req.url) }, { $inc: { points: 7 } })
        const user = await User.find({ name: getLogin(req.url) })
        await User.updateOne({ name: getLogin(req.url) }, { $set: { "posts.$[].points": user[0].points } })
        await User.updateMany({ "posts.$[].comments.$[].nickname": getLogin(req.url) }, { $set: { "posts.$[].comments.$[elem].points": user[0].points } }, { arrayFilters: [{ "elem.nickname": getLogin(req.url) }] })
        await User.updateMany({ "comments.$[].nickname": getLogin(req.url) }, { $set: { "comments.$[elem].points": user[0].points } }, { arrayFilters: [{ "elem.nickname": getLogin(req.url) }] })
    }
})

module.exports = router