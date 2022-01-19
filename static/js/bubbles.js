const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const btn = document.querySelector(".effects")

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const particles = []
const shots = []

const mouse = {
    x: undefined,
    y: undefined,
}

const colors = [
    "#F4BAB8",
    "#F2A683",
    "#DED5D5",
    "#D34A28",
    "#79BDCE"
]

if (!localStorage.getItem("bubbles")) {
    localStorage.setItem("bubbles", 0)
}
let stan = parseInt(localStorage.getItem("bubbles"))

let toggler = () => {
    if (parseInt(localStorage.getItem("bubbles")) === 0) {
        localStorage.setItem("bubbles", 1)
        btn.style.backgroundColor = "limegreen"
        return
    }
    if (parseInt(localStorage.getItem("bubbles")) === 1) {
        localStorage.setItem("bubbles", 0)
        btn.style.backgroundColor = "cornflowerblue"
        return
    }
}

let preset = () => {
    if (parseInt(localStorage.getItem("bubbles")) === 1) {
        btn.style.backgroundColor = "limegreen"
        return
    }
    if (parseInt(localStorage.getItem("bubbles")) === 0) {
        btn.style.backgroundColor = "cornflowerblue"
        return
    }
}

if (btn) {
    preset()
    btn.addEventListener("click", () => {
        toggler()
        stan = parseInt(localStorage.getItem("bubbles"))
    })
}

window.addEventListener("mousemove", e => {
    mouse.x = e.x
    mouse.y = e.y
    if (stan === 0) {
        for (let i = 0; i < 15; i++) {
            particles.push(new Particle())
        }
    }
})

window.addEventListener("click", () => {
    if (stan === 0) {
        for (let i = 0; i < 50; i++) {
            shots.push(new Bomb())
        }
    }
})

class Particle {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y
        this.h = 70
        this.color = `hsl(360, 100%, ${this.h}%)`
        this.size = Math.random() * 7 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.h += 1
        this.color = `hsl(360, 100%, ${this.h}%)`
        if (this.size > 0) {
            this.size -= 0.2
        }
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

class Bomb extends Particle {

    update() {
        this.x += this.speedX + this.speedX / 2
        this.y += this.speedY + this.speedY / 2
        this.h += 1
        this.color = `hsl(360, 100%, ${this.h}%)`
        if (this.size > 0) {
            this.size -= 0.075
        }
    }
}

function animate() {
    if (particles.length > 0) {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update()
            particles[i].draw()
            if (particles[i].size <= 1) {
                particles.splice(i, 1)
            }
        }
    }

    if (shots.length > 0) {
        for (let i = 0; i < shots.length; i++) {
            shots[i].update()
            shots[i].draw()
            if (shots[i].size <= 1) {
                shots.splice(i, 1)
            }
        }
    }
}

function bubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    animate()
    requestAnimationFrame(bubbles)
}
bubbles()