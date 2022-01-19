const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../../models/User")

let taken = 0

router.post("/userCreated", async (req, res) => {
    try {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()
        let hh = today.getHours()
        let mi = today.getMinutes()

        if (dd < 10) {
            dd = `0${dd}`
        }
        if (mm < 10) {
            mm = `0${mm}`
        }
        if (hh < 10) {
            hh = `0${hh}`
        }
        if (mi < 10) {
            mi = `0${mi}`
        }

        today = `${dd}-${mm}-${yyyy} ${hh}:${mi}`
        
        await User.create({ 
            name: req.body.nickname, 
            password: await bcrypt.hash(req.body.password, 10), 
            JoinedAt: today,
            points: 0
        })
            
        res.redirect("/users/login")

    } catch (e) {
        taken = 1
        res.redirect("/users/new")
        console.error(e.message)
    }
})

router.get("/", (req, res) => {
    if (taken === 1) {
        taken = 0
        res.render("userNew", { text: "This name is taken" })
    } else {
        res.render("userNew")
    }
})

module.exports = router