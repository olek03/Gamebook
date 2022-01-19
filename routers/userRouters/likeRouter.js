const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const mongoose = require("mongoose")
const auth = require("../../javascripts/authModel")


router.post("/profile/:id", async (req, res) => {
    auth(req.url, res, 0)
    
    const result = JSON.parse(req.body.like)
    const user = await User.find({ name: result.user })
    const loguser = await User.find({ name: result.liker })

    let copy = 0
    user[0].likes.forEach(like => {
        if (like.toString() == loguser[0]._id.toString()) copy = 1
    })

    if (copy === 1) {
        await User.updateOne({ name: result.user }, { $pull: { likes: loguser[0]._id } })
    } else {
        await User.updateOne({ name: result.user }, { $push: { likes: loguser[0]._id } })
    }
})


router.post("/:id", async (req, res) => {
    auth(req.url, res, 0)

    try {
        const result = JSON.parse(req.body.like)
        const user = await User.find({ name: result.liker })
        const userposts = await User.find({ "posts._id": mongoose.Types.ObjectId(result.postid) })

        userposts[0].posts.filter(async post => {
            if (post.id == mongoose.Types.ObjectId(result.postid)) {
                const ids = []
                for (let i = 0; i < post.likes.length; i++) {
                    ids.push(post.likes[i].toString())
                }

                let copy = 0
                ids.forEach(async elem => {
                    if (elem == user[0]._id.toString()) {
                        copy = 1
                    }
                })
                if (copy === 1) {
                    await User.updateOne({ "posts._id": mongoose.Types.ObjectId(result.postid) }, { $pull: { "posts.$[elem1].likes": user[0]._id } }, { arrayFilters: [{ "elem1._id": mongoose.Types.ObjectId(result.postid) }] })
                } else {
                    await User.updateOne({ "posts._id": mongoose.Types.ObjectId(result.postid) }, { $push: { "posts.$[elem1].likes": user[0]._id } }, { arrayFilters: [{ "elem1._id": mongoose.Types.ObjectId(result.postid) }] })
                }

            }
        })
    } catch (e) {
        console.error(e.message)
    }
})

module.exports = router