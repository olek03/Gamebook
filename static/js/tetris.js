const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 240
canvas.height = 400

ctx.scale(20, 20)

const matrix = [
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0],
        [2, 2, 2],
        [0, 2, 0],
    ],
    [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
    ],
    [
        [0, 4, 0],
        [0, 4, 0],
        [0, 4, 4],
    ],
    [
        [0, 0, 0],
        [5, 5, 0],
        [0, 5, 5],
    ],
    [
        [0, 0, 0],
        [0, 6, 6],
        [6, 6, 0],
    ],
    [
        [7, 7],
        [7, 7],
    ],
]

var color = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
]

//  TWORZENIE ARENY

function plansza(h, w) {
    const matrix = []
    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix
}
const arena = plansza(20, 12)

// RYSOWANIE ELEMENTU MATRIX

function drawMatrix(matrix, kordy) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = color[value]
                ctx.fillRect(x + kordy.x, y + kordy.y, 1, 1)
            }
        })
    })
}

// DEFAULTOWE WARTOŚCI ELEMENTÓW
var rand = Math.floor(Math.random() * 6)
const player = {
    matrix: matrix[rand],
    kordy: { y: 0, x: 4 },
}

var score = 0
const wynik = document.querySelector("#scoreboard")
wynik.innerHTML = "Score: " + score 

//  KOPIOWANIE ELEMENTU DO WARTOŚCI ARENY

function kopiuj(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.kordy.y][x + player.kordy.x] = value
            }
        })
    })
}

//  WYKRYWANIE KOLIZJI

function kolizja(arena, player) {
    const [m, k] = [player.matrix, player.kordy]
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 && (arena[y + k.y] && arena[y + k.y][x + k.x]) !== 0) {
                return true
            }
        }
    }
    return false
}

// KOLOROWANIE CANVASA NA CZARNO

function blackBoard() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// RYSOWANIE JUŻ ZAPISANYCH ELEMENTÓW

function drawArena() {
    arena.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = color[value]
                ctx.fillRect(x, y, 1, 1)
            }
        })
    })
}

// CZYSZCZENIE ARENY W RAZIE PRZEGRANEJ

function przegrana(arena) {
    for (let x = 0; x < arena[1].length; x++) {
        if (arena[1][x] !== 0) {
            arena.forEach((row, y) => {
                row.forEach((value, x) => {
                    arena[y][x] = 0
                    score = 0
                    wynik.innerHTML = "Score: " + score
                })
            })
        }
    }
}

// CZYSZCZENIE UZUPEŁNIONEJ LINII

function wygrana(arena) {
    for (let y = 0; y < arena.length; y++) {
        if (arena[y][0] !== 0 &&
            arena[y][1] !== 0 &&
            arena[y][2] !== 0 &&
            arena[y][3] !== 0 &&
            arena[y][4] !== 0 &&
            arena[y][5] !== 0 &&
            arena[y][6] !== 0 &&
            arena[y][7] !== 0 &&
            arena[y][8] !== 0 &&
            arena[y][9] !== 0 &&
            arena[y][10] !== 0 &&
            arena[y][11] !== 0) {

            const row = arena.splice(y, 1)[0].fill(0);
            arena.unshift(row);
            y++;

            score += 7
            wynik.innerHTML = "Score: " + score

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

            function getPw(reqUrl) {
                var thepassword = []
                var pass = 0
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

            const fullId = `@${getLogin(window.location.href)}?${getPw(window.location.href)}`
            window.location = `points/${fullId}`
            setTimeout(() => window.stop(), 50)
        }
    }
}

// RYSOWANIE WSZYSTKIEGO

function draw() {
    blackBoard()
    drawMatrix(player.matrix, player.kordy)
    drawArena()
}

// GRAWITACJA

var timeMin1 = 0
var reset = 1000
var down = 0

function gravity(time = 0) {
    const delta = time - timeMin1
    timeMin1 = time
    down += delta
    if (down > reset) {
        playerDrop()
    }
    draw()
    wygrana(arena)
    requestAnimationFrame(gravity)
}
gravity()

// SPADEK

function playerDrop() {
    player.kordy.y++
    down = 0
    if (kolizja(arena, player)) {
        player.kordy.y--
        kopiuj(arena, player)
        rand = Math.floor(Math.random() * 7)
        player.matrix = matrix[rand]
        player.kordy = { y: 0, x: 4 }
    }
    przegrana(arena)
}

// RUCH W BOK

function playerMove(dir) {
    player.kordy.x += dir
    if (kolizja(arena, player)) {
        player.kordy.x -= dir
    }
}

// ZBINDOWANE PRZYCISKI

window.addEventListener("keydown", (e) => {
    if (e.key == "a" || e.key == "ArrowLeft") {
        playerMove(-1)
    }
    if (e.key == "d" || e.key == "ArrowRight") {
        playerMove(1)
    }
    if (e.key == "s" || e.key == "ArrowDown") {
        playerDrop()
    }
    if (e.key == "w" || e.key == "ArrowUp") {
        playerRotate(1)
    }
    if (e.key == "e" && pozwolenie === 1) {
        playerCheat()
    }
})

//////<<<  Obracanie elementu

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                    matrix[y][x],
                    matrix[x][y]
                ]
        }
    }
    if (dir > 0) {
        matrix.reverse()
    }
}

function playerRotate(dir) {
    const kordy = player.kordy.x
    let offset = 1
    rotate(player.matrix, dir)
    while (kolizja(arena, player)) {
        player.kordy.x += offset
        offset = -(offset + (offset > 0 ? 1 : -1))
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir)
            player.kordy.x = kordy
            return
        }
    }
}

