const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcrypt")

router.route("/")
    .get((req, res) => {
        res.render("login")
    })
    .post(async (req, res) => {
        let password = await User.find({ name: req.body.login }, { password: 1, _id: 0 })
        
            password = password[0].password

            if (await bcrypt.compare(req.body.password, password)) {
                res.redirect(`/users/@${req.body.login}?${password}`)
            } else {
                res.redirect("/users/login")
            }
        
    })

router.get("/failed", (req, res) => {
    res.render("failed")
})

module.exports = router