const like = document.getElementsByClassName("like")
const commentlike = document.getElementsByClassName("commentlike")
const counter = document.getElementsByClassName("counter")
const commentcounter = document.getElementsByClassName("commentcounter")
let rv = 0
let count = 1

let rv2 = 0
let count2 = 1

for (let i = 0; i < like.length; i++) {

    like[i].addEventListener("click", () => {
        setTimeout(() => window.stop(), 100)
        if (count === -1) {
            counter[i].innerText = parseInt(counter[i].innerText) + count
            rv = 1
        }
        if (count === 1) {
            counter[i].innerText = parseInt(counter[i].innerText) + count
            rv = 0
        }
        if (rv === 1) {
            count = 1
        } else {
            count = -1
        }
        rv = 0
    })
}

for (let i = 0; i < commentlike.length; i++) {

    commentlike[i].addEventListener("click", () => {
        setTimeout(() => window.stop(), 100)
        if (count2 === -1) {
            commentcounter[i].innerText = parseInt(commentcounter[i].innerText) + count2
            rv2 = 1
        }
        if (count2 === 1) {
            commentcounter[i].innerText = parseInt(commentcounter[i].innerText) + count2
            rv2 = 0
        }
        if (rv2 === 1) {
            count2 = 1
        } else {
            count2 = -1
        }
        rv2 = 0
    })
}

const comments = document.getElementsByClassName("commentbtn")

for (let i = 0; i < comments.length; i++) {
    comments[i].addEventListener("click", () => {
        setTimeout(() => window.stop(), 100)
    })
}