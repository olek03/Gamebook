const User = require("../models/User")
const getPw = require("./getPassword")
const getLogin = require("./getLogin")
const userLogin = require("./getUserLogin")
const Image = require("../models/Image")

async function auth(reqUrl, res, number) {

    let matchPassword = getPw(reqUrl)
    let password = await User.find({ name: getLogin(reqUrl) }, { password: 1, _id: 0 })
    if (password != "") {
    password = password[0].password

    let fullId = `@${getLogin(reqUrl)}?${getPw(reqUrl)}`
    let ejsparams
    let site

    const user = await User.find({ name: getLogin(reqUrl) })
    const users = await User.find({ token: false })

    if (user) {

        if (number === 1) {
            site = "success"
            const allposts = []
            for (let y = 0; y < users.length; y++) {
                for (let i = 0; i < users[y].posts.length; i++) {
                    allposts.push(users[y].posts[i])
                }
            }

            const order = allposts.sort((a, b) => a.createdAt - b.createdAt).reverse()

            const image = await Image.find()

            const ranking = await User.find().sort({ points: -1 }).limit(5)

            ejsparams = { fullId: fullId, ranking: ranking, users: users, posts: order, header: "Logged in", image: image, user: user[0] }
        }


        if (number === 3) {
            site = "editPage"

            const image = await Image.find()

            ejsparams = { fullId: fullId, image: image, user: user[0] }

        }


        if (number === 5) {
            site = "search"

            ejsparams = { fullId: fullId }
        }


        if (number === 6) {
            site = "userProfile"


            const finduser = await User.find({ name: userLogin(reqUrl) })
            const image = await Image.find()

            const allposts = []
            for (let i = 0; i < finduser[0].posts.length; i++) {
                allposts.push(finduser[0].posts[i])
            }
            const postorder = allposts.sort((a, b) => a.createdAt - b.createdAt).reverse()


            const someposts = []
            for (let y = 0; y < users.length; y++) {
                for (let i = 0; i < users[y].posts.length; i++) {
                    someposts.push(users[y].posts[i])
                }
            }


            const savedposts = []
            for (let i = 0; i < finduser[0].saved.length; i++) {
                someposts.forEach(post => {
                    if (post._id.toString() == finduser[0].saved[i]._id.toString()) {
                        savedposts.push(post)
                    }
                })
            }
            const savedorder = savedposts.sort((a, b) => a.createdAt - b.createdAt).reverse()

            ejsparams = { fullId: fullId, users: users, posts: postorder, saved: savedorder, image: image, user: finduser[0], loguser: user[0] }

        }

        if (number === 8) {
            site = "userPosts"

            const image = await Image.find({ id: user[0].profilepic })

            ejsparams = { fullId: fullId, nickname: getLogin(reqUrl), posts: thePosts, image: image, }
        }

        if (number === 9) {
            site = "mario"

            ejsparams = { fullId: fullId, name: getLogin(reqUrl) }
        }

        if (number === 10) {
            site = "tetris"

            ejsparams = { fullId: fullId, name: getLogin(reqUrl) }
        }

        if (number === 12) {
            site = "list"

            const userss = await User.find({ token: false }).sort({ name: 1 })
            const image = await Image.find()

            ejsparams = { fullId: fullId, name: getLogin(reqUrl), image: image, users: userss }
        }

        if (matchPassword == password) {
            if (number !== 0) {
                res.render(site, ejsparams)
            }
            return true
        } else {
            res.redirect("/users/login")
            return false
        }
    } else {
        res.redirect("/users/login")
    }
}
}

module.exports = auth