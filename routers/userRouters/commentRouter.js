const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const Image = require("../../models/Image")
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId
const getLogin = require("../../javascripts/getLogin")
const auth = require("../../javascripts/authModel")
const saveImage = require("../../javascripts/saveImage")

router.post("/profileadd/:id", async (req, res) => {
    auth(req.url, res, 0)

    const comment = JSON.parse(req.body.id)
    comment.text = req.body.comment

    const user = await User.find({ name: comment.commenter })

    const newcomment = {
        _id: new ObjectId(),
        user: user[0]._id,
        userprof: user[0].profilepic,
        nickname: comment.commenter,
        text: comment.text,
        createdAt: Date.now(),
        points: user[0].points,
        likes: [],
        photoid: null
    }

    const image = new Image({
        owner: getLogin(req.url),
    })

    if (req.body.image != "") {
        saveImage(image, req.body.image)
        await image.save()
        const thisimg = await Image.find({ _id: image.thisid })

        newcomment.photoid = thisimg[0]._id

        await User.updateOne({ name: comment.user }, { $push: { comments: newcomment } })

    }
    if (req.body.comment != "") {
        if (req.body.image == "") {
            newcomment.photoid = null
            await User.updateOne({ name: comment.user }, { $push: { comments: newcomment } })
        }

    }
})


router.post("/profilecommentlike/:id", async (req, res) => {
    auth(req.url, res, 0)

    const result = JSON.parse(req.body.like)
    const user = await User.find({ name: result.user })
    const loguser = await User.find({ name: result.liker })

    let copy = 0
    user[0].comments.forEach(comment => {
        if (comment._id == result.commentid) {

            const likes = comment.likes
            likes.forEach(like => {
                if (like.toString() == loguser[0]._id.toString()) copy = 1
            })
        }
    })
    if (copy === 1) {
        await User.updateOne({ name: result.user }, { $pull: { "comments.$[elem].likes": loguser[0]._id } }, { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(result.commentid) }] })
    } else {
        await User.updateOne({ name: result.user }, { $push: { "comments.$[elem].likes": loguser[0]._id } }, { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(result.commentid) }] })
    }
})


router.post("/save/:id", async (req, res) => {
    auth(req.url, res, 0)

    const result = JSON.parse(req.body.save)
    const user = await User.find({ name: result.user })

    result.postid = mongoose.Types.ObjectId(result.postid)

    let copy = 0
    
    user[0].saved.forEach(pos => {
        if (pos._id.toString() == result.postid.toString()) copy = 1
    })

    if (copy === 1) {
        await User.updateOne({ name: result.user }, { $pull: { saved:  result.postid } })
    } else {
        await User.updateOne({ name: result.user }, { $push: { saved:  result.postid } })
    }
})


router.post("/add/:id", async (req, res) => {
    auth(req.url, res, 0)

    try {
        const comment = JSON.parse(req.body.id)
        comment.text = req.body.comment

        const user = await User.find({ name: comment.commenter })

        const userposts = await User.find({ "posts._id": mongoose.Types.ObjectId(comment.postid) })

        userposts[0].posts.filter(async post => {
            if (post.id == mongoose.Types.ObjectId(comment.postid)) {

                const newcomment = {
                    _id: new ObjectId(),
                    user: user[0]._id,
                    userprof: user[0].profilepic,
                    nickname: comment.commenter,
                    text: comment.text,
                    createdAt: Date.now(),
                    points: user[0].points,
                    likes: [],
                    photoid: null
                }

                const image = new Image({
                    owner: getLogin(req.url),
                })

                if (req.body.image != "") {
                    saveImage(image, req.body.image)
                    await image.save()
                    const thisimg = await Image.find({ _id: image.thisid })

                    newcomment.photoid = thisimg[0]._id

                    await User.updateOne({ "posts._id": mongoose.Types.ObjectId(comment.postid) }, { $push: { "posts.$[elem1].comments": newcomment } }, { arrayFilters: [{ "elem1._id": mongoose.Types.ObjectId(comment.postid) }] })

                }
                if (req.body.id != "") {
                    if (req.body.image == "") {
                        newcomment.photoid = null
                        await User.updateOne({ "posts._id": mongoose.Types.ObjectId(comment.postid) }, { $push: { "posts.$[elem1].comments": newcomment } }, { arrayFilters: [{ "elem1._id": mongoose.Types.ObjectId(comment.postid) }] })
                    }
                }
            }
        })
    } catch (e) {
        console.error(e.message)
    }
})


router.post("/like/:id", async (req, res) => {
    auth(req.url, res, 0)
    
    const result = JSON.parse(req.body.like)
    const user = await User.find({ name: result.liker })

    const userposts = await User.find({ "posts._id": mongoose.Types.ObjectId(result.postid) })

    userposts[0].posts.filter(async post => {
        if (post.id == mongoose.Types.ObjectId(result.postid)) {
            const addlike = await User.find({ "posts._id": mongoose.Types.ObjectId(result.postid) })
            addlike[0].posts.forEach(async post => {
                if (post._id == result.postid) {
                    const comments = post.comments

                    let copy = 0
                    comments.forEach(comment => {
                        if (comment._id == result.commentid) {

                            const likes = comment.likes

                            likes.forEach(like => {

                                if (like.toString() == user[0]._id.toString()) copy = 1
                            })
                        }
                    })
                    if (copy === 1) {
                        await User.updateOne({ "posts._id": mongoose.Types.ObjectId(result.postid) }, { $pull: { "posts.$[elem1].comments.$[elem2].likes": user[0]._id } }, { arrayFilters: [{ "elem1._id": mongoose.Types.ObjectId(result.postid) }, { "elem2._id": mongoose.Types.ObjectId(result.commentid) }] })
                    } else {
                        await User.updateOne({ "posts._id": mongoose.Types.ObjectId(result.postid) }, { $push: { "posts.$[elem1].comments.$[elem2].likes": user[0]._id } }, { arrayFilters: [{ "elem1._id": mongoose.Types.ObjectId(result.postid) }, { "elem2._id": mongoose.Types.ObjectId(result.commentid) }] })
                    }
                }
            })

        }
    })
})

module.exports = router