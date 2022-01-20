function getPassword(reqUrl) {
    let thepassword = []
    let pass = 0
    for (let i = 0; i < reqUrl.length; i++) {
        if (reqUrl[i - 1] == "?") {
            pass = 1
        }
        if (pass == 1) {
            thepassword.push(reqUrl[i])
        }
    }
    thepassword = thepassword.join("")
    return thepassword
}

module.exports = getPassword