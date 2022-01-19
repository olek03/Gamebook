const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const Image = require("../../models/Image")
const auth = require("../../javascripts/authModel")
const getLogin = require("../../javascripts/getLogin")
const getPw = require("../../javascripts/getPassword")
const saveImage = require("../../javascripts/saveImage")

router.route("/:id")
.get((req, res) => auth(req.url, res, 3))

.post(async (req, res) => {
        const fullId = `@${getLogin(req.url)}?${getPw(req.url)}`

        auth(req.url, res, 0)

        try {

            if (req.body.image) {
                const user = await User.find({ name: getLogin(req.url) })

                if (req.body.image != "") {
                    if (user[0].profilepic != null) await Image.deleteOne({ _id: user[0].profilepic })
                    const image = new Image({
                        owner: getLogin(req.url),
                    })
                    saveImage(image, req.body.image)
                    await image.save()
                    await User.updateOne({ name: getLogin(req.url) }, { $set: { profilepic: image.thisid } })
                    await User.updateOne({ name: getLogin(req.url) }, { $set: { "posts.$[].userprof": image.thisid } })
                    await User.updateMany({ "posts.$[].comments.$[].nickname": getLogin(req.url) }, { $set: { "posts.$[].comments.$[elem].userprof": image.thisid } }, { arrayFilters: [{ "elem.nickname": getLogin(req.url) }] })
                    await User.updateMany({ "comments.$[].nickname": getLogin(req.url) }, { $set: { "comments.$[elem].userprof": image.thisid } }, { arrayFilters: [{ "elem.nickname": getLogin(req.url) }] })
                }
            }
        } catch (e) {
            console.error(e.message)
        }

        if (req.body.desc) {

            await User.updateOne(
                { name: getLogin(req.url) },
                { $set: { description: req.body.desc } },
            )
        }
        res.redirect(`/users/edit/${fullId}`)


    })

module.exports = router