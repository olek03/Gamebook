const express = require("express")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId
const User = require("../../models/User")
const Image = require("../../models/Image")
const auth = require("../../javascripts/authModel")
const getPw = require("../../javascripts/getPassword")
const getLogin = require("../../javascripts/getLogin")
const saveImage = require("../../javascripts/saveImage")

router.get("/add/:id", (req, res) => {
    let stan = 0
    for (let i = 0; i < req.url.length; i++) {
        if (req.url[i] == "@") {
            stan = 1
            break
        }
    }
    if (stan == 1) {

        auth(req.url, res, 8)

    } else {
        res.redirect("/users/login/failed")
    }
})


router.post("/add/:id", async (req, res) => {
    let fullId = `@${getLogin(req.url)}?${getPw(req.url)}`
    const user = await User.find({ name: getLogin(req.url) }, { _id: 0 })
    const image = new Image({
        owner: getLogin(req.url),
    })

    try {
        if (req.body.image != "") {
            saveImage(image, req.body.image)
            await image.save()
            const thisimg = await Image.find({ _id: image.thisid })
            
            if (req.body.post == "") {
                await User.updateOne({ name: getLogin(req.url) }, { $push: { posts: { nickname: getLogin(req.url), points: user[0].points, likes: [], text: null, _id: new ObjectId(), userprof: user[0].profilepic, createdAt: Date.now(), photoid: thisimg[0]._id } } })
            } else {
                await User.updateOne({ name: getLogin(req.url) }, { $push: { posts: { nickname: getLogin(req.url), points: user[0].points, likes: [], text: req.body.post, _id: new ObjectId(), userprof: user[0].profilepic, createdAt: Date.now(), photoid: thisimg[0]._id } } })
            }
        }
        if (req.body.post != "") {
            if (req.body.image == "") {
                await User.updateOne({ name: getLogin(req.url) }, { $push: { posts: { nickname: getLogin(req.url), points: user[0].points, likes: [], text: req.body.post, _id: new ObjectId(), userprof: user[0].profilepic, createdAt: Date.now(), photoid: null } } })
            }
        }
    } catch (e) {
        console.error(e.message)
    }

    res.redirect(`/users/${fullId}`)
})

module.exports = router