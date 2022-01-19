function userLogin(url) {
    let userlogin = []
    let stan = 0
    for (let i = url.length; i >= 0; i--) {
        if (url[i + 1] == "@") {
            stan = 1
        }
        if (stan === 1) {
            userlogin.push(url[i])
        }
        if (url[i - 1] == "/" && stan === 1) break
    }
    userlogin = userlogin.reverse()
    userlogin = userlogin.join("")
    return userlogin
}

module.exports = userLogin