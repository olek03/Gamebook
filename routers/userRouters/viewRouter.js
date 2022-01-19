const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const auth = require("../../javascripts/authModel")
const getPw = require("../../javascripts/getPassword")
const getLogin = require("../../javascripts/getLogin")


router.post("/:id", (req, res) => {
    res.redirect(`/users/view/${req.body.find}${req.params.id}?${getPw(req.url)}`)
})


router.get("/:id", (req, res) => {
    auth(req.url, res, 6)
})

module.exports = router