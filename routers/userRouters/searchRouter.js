const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const auth = require("../../javascripts/authModel")
const getLogin = require("../../javascripts/getLogin")
const getPw = require("../../javascripts/getPassword")

router.post("/:id", async (req, res) => {
    auth(req.url, res, 0)
    const fullId = `@${getLogin(req.url)}?${getPw(req.url)}`

    const result = req.body.search
    const user = await User.find({ name: result })
    if (user[0]) {
        res.redirect(`/users/view/${result}${fullId}`)
    } else {
        res.redirect(`/users/list/${fullId}`)
    }
})


module.exports = router