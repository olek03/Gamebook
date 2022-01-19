function getLogin(reqUrl) {
    let thelogin = []
    let stan = 0
    for (let i = 0; i < reqUrl.length; i++) {
        if (reqUrl[i - 1] == "@") {
            stan = 1
        }
        if (stan === 1) {
            thelogin.push(reqUrl[i])
        }
        if (reqUrl[i + 1] == "?") break
    }
    thelogin = thelogin.join("")
    return thelogin
}

module.exports = getLogin