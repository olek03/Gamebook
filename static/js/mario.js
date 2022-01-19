const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1600
canvas.height = 800
const skala = 8
ctx.scale(skala, skala)
const wysokosc = 100
const szerokosc = 200

//////////// <--------> ////////////>- MODEL MARIO -<//////////// <--------> ////////////

const mario = [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 4, 4, 4, 2, 4, 0, 0, 0, 0],
    [0, 0, 0, 3, 4, 3, 4, 4, 4, 4, 2, 4, 0, 0, 0, 0],
    [0, 0, 0, 3, 4, 3, 3, 4, 4, 4, 4, 2, 4, 4, 0, 0],
    [0, 0, 0, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 5, 1, 1, 5, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 0, 0],
    [0, 0, 4, 4, 1, 5, 6, 5, 5, 6, 5, 1, 4, 4, 0, 0],
    [0, 0, 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 0, 0],
    [0, 0, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 0, 0],
    [0, 0, 0, 0, 5, 5, 5, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0]
]

//////////// <--------> ////////////>- MODELE PRZECIWNIKÓW -<//////////// <--------> ////////////

var enemies = [
    [              //// GRZYB ////
        [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
        [0, 0, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 0, 0],
        [0, 3, 3, 3, 4, 2, 3, 3, 3, 3, 2, 4, 3, 3, 3, 0],
        [0, 3, 3, 3, 4, 2, 3, 3, 3, 3, 2, 4, 3, 3, 3, 0],
        [3, 3, 3, 3, 4, 2, 4, 3, 3, 4, 2, 4, 3, 3, 3, 3],
        [3, 3, 3, 3, 4, 4, 4, 3, 3, 4, 4, 4, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [0, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 0],
        [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
        [0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 0, 0],
        [0, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0],
    ],
    [              //// ZÓŁW ////
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 9, 9, 9, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 9, 9, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 9, 9, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 9, 9, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 9, 9, 9, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 9, 2, 4, 2],
        [0, 0, 0, 2, 2, 2, 0, 0, 2, 4, 4, 4, 4, 4, 4, 2],
        [0, 0, 2, 8, 8, 8, 2, 2, 2, 4, 4, 2, 2, 4, 4, 2],
        [0, 2, 8, 2, 8, 2, 8, 2, 9, 2, 4, 2, 2, 4, 4, 2],
        [0, 2, 8, 8, 2, 8, 8, 2, 9, 2, 4, 2, 0, 2, 4, 2],
        [2, 8, 8, 2, 8, 2, 8, 2, 9, 2, 4, 4, 2, 0, 2, 2],
        [2, 8, 2, 8, 8, 8, 2, 8, 2, 9, 2, 4, 4, 2, 2, 0],
        [2, 2, 8, 8, 8, 8, 8, 2, 2, 9, 2, 4, 4, 4, 2, 0],
        [2, 8, 2, 8, 8, 8, 2, 8, 2, 9, 2, 4, 2, 2, 0, 0],
        [2, 8, 8, 2, 8, 2, 8, 8, 2, 9, 2, 4, 2, 0, 0, 0],
        [2, 8, 8, 8, 2, 8, 8, 8, 2, 9, 2, 2, 0, 0, 0, 0],
        [0, 2, 8, 2, 8, 2, 8, 2, 9, 9, 2, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 2, 0, 0, 0, 0, 0],
        [2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 0, 0, 0, 0],
        [2, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 4, 2, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 0, 2, 4, 4, 4, 4, 2, 0, 0, 0],
        [2, 9, 4, 4, 4, 2, 0, 2, 4, 4, 4, 4, 9, 2, 0, 0],
        [2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    ],
    [       //// SKORUPA ////
        [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 8, 8, 8, 8, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 2, 8, 8, 2, 2, 2, 2, 8, 8, 2, 0, 0, 0],
        [0, 0, 2, 8, 8, 2, 8, 8, 8, 8, 2, 8, 8, 2, 0, 0],
        [0, 0, 2, 8, 2, 8, 8, 8, 8, 8, 8, 2, 8, 2, 0, 0],
        [0, 2, 8, 2, 8, 8, 8, 8, 8, 8, 8, 8, 2, 8, 2, 0],
        [0, 2, 2, 8, 2, 8, 8, 8, 8, 8, 8, 2, 2, 8, 2, 0],
        [2, 2, 8, 8, 8, 2, 8, 8, 8, 8, 2, 8, 8, 8, 2, 2],
        [2, 2, 8, 8, 8, 8, 2, 2, 2, 2, 8, 8, 8, 8, 2, 2],
        [2, 2, 2, 8, 8, 2, 8, 8, 8, 8, 2, 8, 8, 2, 2, 2],
        [2, 9, 2, 2, 2, 8, 8, 8, 8, 8, 8, 2, 2, 2, 9, 2],
        [2, 9, 9, 9, 2, 8, 8, 8, 8, 8, 8, 2, 9, 9, 9, 2],
        [0, 2, 2, 9, 9, 2, 2, 2, 2, 2, 2, 9, 9, 2, 2, 0],
        [0, 0, 0, 2, 9, 9, 9, 9, 9, 9, 9, 9, 2, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 9, 9, 9, 9, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    ],
    [       //// CHMURA ////
        [0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 9, 9, 9, 9, 2, 0, 0, 0, 0],
        [0, 0, 2, 2, 9, 9, 9, 9, 9, 9, 2, 0, 0, 0],
        [0, 2, 9, 9, 10, 9, 9, 9, 9, 9, 9, 2, 2, 0],
        [2, 9, 9, 9, 9, 10, 9, 9, 9, 9, 10, 9, 9, 2],
        [2, 9, 9, 9, 9, 9, 9, 9, 9, 10, 9, 9, 9, 2],
        [2, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2],
        [0, 2, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 0],
        [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    ],
    [              //// ZÓŁW ////
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 9, 9, 9, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 9, 9, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 9, 9, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 9, 9, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 9, 9, 9, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 9, 2, 4, 2],
        [0, 0, 0, 2, 2, 2, 0, 0, 2, 4, 4, 4, 4, 4, 4, 2],
        [0, 0, 2, 8, 8, 8, 2, 2, 2, 4, 4, 2, 2, 4, 4, 2],
        [0, 2, 8, 2, 8, 2, 8, 2, 9, 2, 4, 2, 2, 4, 4, 2],
        [0, 2, 8, 8, 2, 8, 8, 2, 9, 2, 4, 2, 0, 2, 4, 2],
        [2, 8, 8, 2, 8, 2, 8, 2, 9, 2, 4, 4, 2, 0, 2, 2],
        [2, 8, 2, 8, 8, 8, 2, 8, 2, 9, 2, 4, 4, 2, 2, 0],
        [2, 2, 8, 8, 8, 8, 8, 2, 2, 9, 2, 4, 4, 4, 2, 0],
        [2, 8, 2, 8, 8, 8, 2, 8, 2, 9, 2, 4, 2, 2, 0, 0],
        [2, 8, 8, 2, 8, 2, 8, 8, 2, 9, 2, 4, 2, 0, 0, 0],
        [2, 8, 8, 8, 2, 8, 8, 8, 2, 9, 2, 2, 0, 0, 0, 0],
        [0, 2, 8, 2, 8, 2, 8, 2, 9, 9, 2, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 2, 0, 0, 0, 0, 0],
        [2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 0, 0, 0, 0],
        [2, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 4, 2, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 0, 2, 4, 4, 4, 4, 2, 0, 0, 0],
        [2, 9, 4, 4, 4, 2, 0, 2, 4, 4, 4, 4, 9, 2, 0, 0],
        [2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    ],
    [       //// BOSS ////
        [0, 0, 11, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 11, 0, 0],
        [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
        [2, 11, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 11, 2],
        [2, 9, 2, 0, 2, 11, 11, 9, 9, 11, 11, 11, 0, 2, 9, 2],
        [2, 9, 11, 2, 11, 11, 2, 1, 1, 2, 11, 11, 2, 11, 9, 2],
        [2, 11, 11, 11, 11, 2, 1, 2, 9, 1, 2, 11, 11, 11, 11, 2],
        [0, 2, 11, 11, 11, 11, 1, 2, 2, 1, 11, 11, 11, 11, 2, 0],
        [0, 0, 2, 2, 11, 11, 11, 1, 1, 11, 11, 11, 2, 2, 0, 0],
        [0, 0, 0, 0, 2, 11, 11, 11, 11, 11, 11, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 11, 11, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 11, 11, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    ],
    [       //// BOSS FIRE ////
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 11, 11, 12, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 12, 11, 11, 12, 0, 12, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 12, 11, 11, 12, 0, 12, 12, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 11, 11, 12, 12, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 12, 11, 11, 12, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 2, 0, 0, 12, 11, 11, 12, 0, 0, 2, 11, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 12, 11, 11, 12, 0, 0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 12, 0, 2, 11, 2, 0, 12, 2, 2, 2, 2, 2, 2, 12, 0, 2, 11, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 2, 9, 2, 0, 2, 11, 11, 9, 9, 11, 11, 11, 0, 2, 9, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 12, 0, 0, 2, 9, 11, 2, 11, 11, 2, 1, 1, 2, 11, 11, 2, 11, 9, 2],
        [0, 0, 0, 12, 12, 0, 0, 0, 0, 0, 0, 12, 0, 12, 0, 12, 12, 0, 0, 0, 12, 2, 11, 11, 11, 11, 2, 1, 2, 9, 1, 2, 11, 11, 11, 11, 2],
        [0, 0, 12, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 2, 11, 11, 11, 11, 1, 2, 2, 1, 11, 11, 11, 11, 2, 0],
        [12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 2, 2, 11, 11, 11, 1, 1, 11, 11, 11, 2, 2, 0, 0],
        [0, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 2, 11, 11, 11, 11, 11, 11, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 12, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 2, 2, 11, 11, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 2, 0, 0, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 11, 11, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    ]
]

const heart = [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 9, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
]

//////////// <--------> ////////////>- DOMYŚLNE STARTOWE WARTOŚCI -<//////////// <--------> ////////////

const start = 1
const bgcolor = "#A1EEFF"
const fps = 60
const podloga = 5
const bossLife = 6
const grawitacja = 10
var jump = 6
var speed = 1
var enemySpeed1 = 1
var enemySpeed2 = 1
var enemySpeed3 = 1
var enemySpeed4 = 1
var enemyJumpFreq = 1000 // ms
var size = 1
var skoki
var pass = 0
var boss = enemies[5]
var fire = enemies[6]

var defSpeed = speed
var defJump = jump

const startY = wysokosc - 16 - podloga
const startX = 5

//////////// <--------> ////////////>- KOLORY ARENY -<//////////// <--------> ////////////

const colors = [
    null,
    "rgb(79,161,255)",
    "rgb(21,129,255)",
    "rgb(0,82,177)",
    "rgb(0,55,119)",
    "rgb(0,28,60)",
    "brown",
    "#D582FF",
    "pink",
    "black"
]

//////////// <--------> ////////////>- KOLORY MODELI -<//////////// <--------> ////////////

const modelColor = [
    null,
    "red",
    "black",
    "brown",
    "#ffdbac",
    "blue",
    "gold",
    "#add8e6",
    "limegreen",
    "white",
    "lightgray",
    "yellow",
    "orange"
]

const player = {
    matrix: mario,
    pos: {
        y: startY,
        x: startX
    },
}

const enemy1 = {
    matrix: null,
    pos: {
        y: null,
        x: null
    },
}
const enemy2 = {
    matrix: null,
    pos: {
        y: null,
        x: null
    },
}
const enemy3 = {
    matrix: null,
    pos: {
        y: null,
        x: null
    },
}
const enemy4 = {
    matrix: null,
    pos: {
        y: null,
        x: null
    },
}

const level = {
    arena: start,
    arenaColor: 1,
}


//////////// <--------> ////////////>- KOLOROWANIE TŁA -<//////////// <--------> ////////////

function drawbg() {
    ctx.fillStyle = bgcolor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

//////////// <--------> ////////////>- INSTRUKCJE -<//////////// <--------> ////////////

function text() {
    if (level.arena === 1) {
        ctx.font = "8px Comic Sans MS"
        ctx.fillStyle = "rgb(255, 95, 61)"
        ctx.textAlign = "center"
        ctx.fillText("Use", szerokosc / 7, 52)
        ctx.fillText("A, D to move", szerokosc / 7, 60)
        ctx.fillText("Use", szerokosc / 2.1, 32)
        ctx.fillText("W to jump", szerokosc / 2.1, 40)
    }
    if (level.arena === 2) {
        ctx.font = "8px Comic Sans MS"
        ctx.fillStyle = "rgb(255, 95, 61)"
        ctx.textAlign = "center"
        ctx.fillText("Hold P or Q to sprint", szerokosc / 2, 40)

        ctx.font = "5px Comic Sans MS"
        ctx.fillStyle = "limegreen"
        ctx.fillText("(!) Sprinting makes you faster, but it also reduces your jump", szerokosc / 2, 10)
    }
    if (level.arena === 3) {
        ctx.textAlign = "center"
        ctx.font = "7px Comic Sans MS"
        ctx.fillStyle = "limegreen"
        ctx.fillText("(!) Jump on the enemy to get rid of him", szerokosc / 2, 30)
    }
    if (level.arena === 4) {
        ctx.textAlign = "center"
        ctx.font = "5px Comic Sans MS"
        ctx.fillStyle = "limegreen"
        ctx.fillText("(!) Some of your enemies may jump when you are nearby", szerokosc / 2, 10)
    }
    if (level.arena === 6) {
        ctx.textAlign = "center"
        ctx.font = "5px Comic Sans MS"
        ctx.fillStyle = "limegreen"
        ctx.fillText("(!) Jump on the clouds", szerokosc / 2, 10)
    }
    if (level.arena === 8 && enemy3.matrix === null && enemy4.matrix === null && kluczyk === 1) {
        ctx.textAlign = "center"
        ctx.font = "5px Comic Sans MS"
        ctx.fillStyle = "limegreen"
        ctx.fillText("(!) Key", 191, 56)
    }
    if (level.arena === 9) {
        if (bossPop !== 0) {
            if (bossPop <= 1) {
                drawModel(heart, { y: 15, x: 60 })
            }
            if (bossPop <= 2) {
                drawModel(heart, { y: 15, x: 75 })
            }
            if (bossPop <= 3) {
                drawModel(heart, { y: 15, x: 90 })
            }
            if (bossPop <= 4) {
                drawModel(heart, { y: 15, x: 105 })
            }
            if (bossPop <= 5) {
                drawModel(heart, { y: 15, x: 120 })
            }
        }
        if (bossPop === 0) {
            ctx.textAlign = "center"
            ctx.font = "15px Comic Sans MS"
            ctx.fillStyle = "limegreen"
            ctx.fillText("You won !!!", szerokosc / 2, 40)
        }
    }
}
var kluczyk = 1
//////////// <--------> ////////////>- GENEROWANIE ARENY -<//////////// <--------> ////////////

function genArena(w, h) {
    const field = []
    while (h--) {
        field.push(new Array(w).fill(0))
    }
    return field
}
const arena = genArena(szerokosc, wysokosc)

//////////// <--------> ////////////>- GENEROWANIE PODŁOGI -<//////////// <--------> ////////////

const layer = wysokosc - podloga
function floor() {
    for (let y = wysokosc; y > layer; y--) {
        for (let i = 0; i < szerokosc; i++) {
            arena[y - 1][i] = 7
        }
    }
}

//////////// <--------> ////////////>- ZEROWANIE ARENY -<//////////// <--------> ////////////

function clear() {
    for (let y = 0; y < wysokosc; y++) {
        for (let x = 0; x < szerokosc; x++) {
            arena[y][x] = 0
        }
    }
}

//////////// <--------> ////////////>- GENERATORY STRUKTUR -<//////////// <--------> ////////////

function gen(y1, y2, x1, x2, kolor = level.arenaColor) {
    for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
            arena[y][x] = kolor
        }
    }
}

function hole(x1, x2) {
    for (let y = 94; y < 100; y++) {
        for (let x = x1; x < x2; x++) {
            arena[y][x] = 0
        }
    }
}

//////////// <--------> ////////////>- POZIOMY -<//////////// <--------> ////////////


//////////// <--------> //////////// POZIOM 1 //////////// <--------> ////////////

function level1() {

    ///// PRZESZKODY /////

    gen(85, 95, 30, 40)
    gen(70, 75, 60, 70)
    gen(65, 70, 95, 100)
    gen(55, 60, 125, 150)
    gen(55, 60, 180, 200)

    ///// DZIURY /////

    hole(70, 132)
}

//////////// <--------> //////////// POZIOM 2 //////////// <--------> ////////////

function level2() {

    ///// PRZESZKODY /////

    gen(55, 60, 0, 20)
    gen(85, 95, 36, 46)
    gen(70, 75, 70, 80)
    gen(65, 70, 120, 140)

    ///// DZIURY /////

    hole(65, 135)
}

//////////// <--------> //////////// POZIOM 3 //////////// <--------> ////////////

function level3() {

    ///// PRZESZKODY /////

    gen(85, 95, 85, 95)
    gen(75, 95, 115, 125)
    gen(85, 95, 175, 185)

    ///// DZIURY /////

    hole(70, 85)

    ///// PRZECIWNICY /////

    enemy1.matrix = enemies[0]
    enemy1.pos.y = 78
    enemy1.pos.x = 157
}

//////////// <--------> //////////// POZIOM 4 //////////// <--------> ////////////

function level4() {

    ///// PRZESZKODY /////

    gen(72, 80, 30, 40)
    gen(50, 58, 10, 20)
    gen(55, 60, 80, 100)
    gen(70, 75, 110, 170)
    gen(0, 30, 180, 200)
    gen(50, 100, 180, 200)

    ///// DZIURY /////

    hole(30, 180)

    ///// PRZECIWNICY /////

    enemy1.matrix = enemies[1]
    enemy1.pos.y = 32
    enemy1.pos.x = 160
    skoczek = enemy1
    skoki = setInterval(enemyJump, enemyJumpFreq)
    turn(enemy1.matrix)

    //// USTAWIENIE GRACZA ////

    player.pos.y = startY
}

//////////// <--------> //////////// POZIOM 5 //////////// <--------> ////////////

function level5() {

    ///// PRZESZKODY /////

    gen(30, 95, 95, 105)
    gen(0, 50, 120, 125)
    gen(70, 95, 120, 125)
    gen(20, 24, 20, 60)
    gen(40, 45, 0, 5)
    gen(60, 64, 0, 50)
    gen(65, 70, 145, 150)
    gen(47, 50, 125, 130)
    gen(50, 95, 190, 200)
    gen(82, 86, 170, 175)

    ///// DZIURY /////

    hole(105, 120)
    hole(20, 35)

    ///// PRZECIWNICY /////

    enemy1.matrix = enemies[0]
    enemy1.pos.y = 0
    enemy1.pos.x = 40

    enemy2.matrix = enemies[3]
    enemy2.pos.y = 60
    enemy2.pos.x = 55

    //// USTAWIENIE GRACZA ////

    player.pos.y = startY
}

//////////// <--------> //////////// POZIOM 6 //////////// <--------> ////////////

function level6() {

    ///// PRZESZKODY /////

    gen(35, 100, 120, 125)
    gen(45, 50, 0, 15)
    gen(35, 40, 185, 200)
    gen(40, 100, 195, 200)
    gen(45, 50, 70, 75)

    ///// DZIURY /////

    hole(0, 120)
    hole(125, 195)

    ///// PRZECIWNICY /////

    enemy1.matrix = enemies[3]
    enemy1.pos.y = 40
    enemy1.pos.x = 40

    enemy2.matrix = enemies[3]
    enemy2.pos.y = 40
    enemy2.pos.x = 100

    enemy3.matrix = enemies[3]
    enemy3.pos.y = 40
    enemy3.pos.x = 150

    //// USTAWIENIE GRACZA ////

    player.pos.y = 0
}

//////////// <--------> //////////// POZIOM 7 //////////// <--------> ////////////

function level7() {

    ///// PRZESZKODY /////

    gen(55, 95, 28, 35)
    gen(75, 80, 20, 30)
    gen(27, 33, 185, 200)
    gen(33, 95, 195, 200)
    gen(28, 35, 75, 125, 9)
    gen(0, 30, 75, 80, 9)
    gen(0, 30, 120, 125, 9)

    ///// PRZECIWNICY /////

    enemy2.matrix = enemies[1]
    enemy2.pos.y = 0
    enemy2.pos.x = 90
    turn(enemy2.matrix)

    enemy3.matrix = enemies[4]
    enemy3.pos.y = 0
    enemy3.pos.x = 100
    turn(enemy3.matrix)

    skoczek = enemy2
    skoki = setInterval(enemyJump, enemyJumpFreq)

    //// USTAWIENIE GRACZA ////

    player.pos.y = startY
}

//////////// <--------> //////////// POZIOM 8 //////////// <--------> ////////////

function level8() {

    ///// PRZESZKODY /////

    gen(63, 68, 33, 40)
    gen(63, 68, 85, 92)
    gen(60, 95, 180, 200, 8)
    gen(20, 25, 10, 55)
    gen(15, 25, 50, 55)
    gen(45, 50, 160, 200)
    gen(30, 50, 160, 165)
    gen(0, 50, 195, 200)

    ///// PRZECIWNICY /////

    enemy1.matrix = enemies[3]
    enemy1.pos.y = 60
    enemy1.pos.x = 8

    enemy2.matrix = enemies[3]
    enemy2.pos.y = 60
    enemy2.pos.x = 55

    enemy3.matrix = enemies[0]
    enemy3.pos.y = 0
    enemy3.pos.x = 20

    enemy4.matrix = enemies[1]
    enemy4.pos.y = 18
    enemy4.pos.x = 178
    enemySpeed4 = -1

    //// USTAWIENIE GRACZA ////

    player.pos.y = startY
}

//////////// <--------> //////////// POZIOM 9 //////////// <--------> //////////// <-- BOSSFIGHT

function level9() {

    ///// PRZECIWNICY /////

    if (prev === 1) {
        turn(enemies[6])
        turn(enemies[5])
        prev = 2
    }
    enemy1.matrix = boss
    enemy1.pos.y = 65
    enemy1.pos.x = 170
}

//////////// <--------> ////////////>- ATAKOWANIE BOSA -<//////////// <--------> ////////////

var bossX
let btime = 0
let bspadek = 1500
let blicznik = 0
var atak = 0
var prev = 1
function bossFire(time = 0) {
    const delta = time - btime
    btime = time
    blicznik += delta

    if (blicznik < bspadek / 10) {
        atak = 1
        enemy1.pos.y = layer - boss.length

        if (enemy1.pos.x < szerokosc - fire[0].length + 1 && player.pos.x < enemy1.pos.x) {
            enemy1.pos.x = bossX - fire[0].length + boss[0].length
        }
        if (player.pos.x > enemy1.pos.x) {
            enemy1.pos.x = bossX
        }
        enemy1.pos.y = 70

        enemy1.matrix = enemies[6]
    }
    if (blicznik > bspadek / 6) {
        atak = 0
        enemy1.pos.y = layer - boss.length
        enemy1.matrix = boss
        enemy1.pos.x = bossX
    }
    if (blicznik > bspadek) {
        blicznik = 0
    }

    if (enemy1.pos.x < 40 || player.pos.x > enemy1.pos.x) {
        enemySpeed1 = -1
    }
    if (enemy1.pos.x > 160 || player.pos.x < enemy1.pos.x) {
        enemySpeed1 = 1
    }
}

//////////// <--------> ////////////>- WYSTAWIANIE PŁOMIENIA DO GRACZA -<//////////// <--------> ////////////

function flames() {
    if (level.arena === 9 && enemy1.matrix !== null) {
        if (player.pos.x > enemy1.pos.x && kierunek === 1) {
            turn(enemies[6])
            turn(enemies[5])
            prev = 2 // cel w prawo
        }
        if (player.pos.x < enemy1.pos.x && kierunek === 2) {
            turn(enemies[6])
            turn(enemies[5])
            prev = 1 // cel w lewo
        }
    }
    if (player.pos.x < enemy1.pos.x) {
        kierunek = 1
    }
    if (player.pos.x > enemy1.pos.x) {
        kierunek = 2
    }
}

//////////// <--------> ////////////>- GENEROWANIE POZIOMU -<//////////// <--------> ////////////

function newLevel() {
    clear()
    floor()
    enemyRemove()
    pass = 0
    if (level.arena === 1) {
        level1()
    }
    if (level.arena === 2) {
        level2()
    }
    if (level.arena === 3) {
        level3()
    }
    if (level.arena === 4) {
        level4()
    }
    if (level.arena === 5) {
        level5()
    }
    if (level.arena === 6) {
        level6()
    }
    if (level.arena === 7) {
        level7()
    }
    if (level.arena === 8) {
        level8()
    }
    if (level.arena === 9) {
        level9()
    }
    if (level.arena === 10) {
        level.arena = 1
        level1()
    }
}
newLevel()

//////////// <--------> ////////////>- RESET -<//////////// <--------> ////////////

function reset() {
    clearInterval(skoki)
    player.pos.x = startX
    player.pos.y = startY
    bossPop = 1
    atak = 0
    boss = enemies[5]
    fire = enemies[6]
    if (level.arena >= 3 && level.arena <= 5) {
        level.arena = 3
    }
    if (level.arena >= 6 && level.arena <= 7) {
        level.arena = 6
    }
    if (level.arena >= 8) {
        level.arena = 8
    }
    enemyRemove()
    newLevel()
}

//////////// <--------> ////////////>- RESETOWANIE PRZECIWNIKA -<//////////// <--------> ////////////

function enemyReset(enemy) {
    enemy.matrix = null
    enemy.pos.y = null
    enemy.pos.x = null
    theEnemy = undefined
    popwait1 = 0
    popwait2 = 0
    popwait3 = 0
    popwait4 = 0
    enemySpeed1 = 1
    enemySpeed2 = 1
    enemySpeed3 = 1
    enemySpeed4 = 1
}

//////////// <--------> ////////////>- USUWANIE WSZYSTKICH PRZECIWNIKÓW -<//////////// <--------> ////////////>-

function enemyRemove() {
    enemyReset(enemy1)
    enemyReset(enemy2)
    enemyReset(enemy3)
    enemyReset(enemy4)
    skoczek = undefined
    clearInterval(skoki)
}

//////////// <--------> ////////////>- CZY PRZEJŚĆ NA KOLEJNY POZIOM -<//////////// <--------> ////////////

function nextLevel() {
    if (player.pos.x >= 185 && level.arena !== 9) {
        level.arena++
        player.pos.x = startX
        newLevel()
    }
    if (player.pos.y >= 84) {
        reset()
    }
    if (player.pos.y < 0) {
        player.pos.y = 2
    }

    if (level.arena === 7) {
        if (enemy2.matrix === null && enemy3.matrix === null) {
            clearInterval(skoki)
            gen(40, 45, 160, 170)
            gen(55, 60, 135, 145)
            gen(70, 75, 110, 120)
            gen(85, 90, 85, 95)
        }
        if (player.pos.x >= 25) {
            gen(28, 35, 75, 125, 0)
            gen(0, 30, 75, 80, 0)
            gen(0, 30, 120, 125, 0)
        }
    }

    if (level.arena === 8) {
        if (pass === 1) {
            gen(50, 55, 120, 130, 0)
            gen(0, 45, 195, 200, 0)
            gen(58, 64, 115, 122)
            gen(52, 58, 140, 147)

            if (enemy2.matrix === null) {
                chmura = setTimeout(chmurka, 2000)
            }
        }
        if (player.pos.y < 32) {
            gen(15, 20, 50, 60, 0)
        }
        if (player.pos.x === 166 && enemy3.matrix === null && enemy4.matrix === null) {
            pass = 1
            kluczyk = 0
        }
        if (player.pos.x >= 130) {
            gen(30, 50, 160, 165, 0)
        }
        if (enemy3.matrix === null && enemy4.matrix === null && pass === 0) {
            kluczyk = 1
        }
    }

    if (level.arena === 9) {
        if (atak === 0) {
            bossX = enemy1.pos.x
        }
        if (bossPop !== 0) {
            requestAnimationFrame(bossFire)
        }
        if (enemy1.matrix === null && player.pos.x >= 185) {
            level.arena++
            player.pos.x = startX
            newLevel()
        }
    }
}

//////////// <--------> ////////////>- RESPAWN CHMURY -<//////////// <--------> ////////////

function chmurka() {
    if (level.arena === 8) {
        enemy2.matrix = enemies[3]
        enemy2.pos.y = 60
        enemy2.pos.x = 55
    }
}
var chmura

//////////// <--------> ////////////>- CZY POD MODELEM JEST DZIURA -<//////////// <--------> ////////////

function collide(player) {
    const [m, o] = [player.matrix, player.pos]
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true // model stoi na ziemi
            }
        }
    }
    return false // pod modelem jest dziura
}

//////////// <--------> ////////////>- CZY MARIO WSZEDŁ W PRZECIWNIKA -<//////////// <--------> ////////////

function touchEnemy(enemy) {
    if ((player.pos.x > enemy.pos.x - enemy.matrix[0].length + 4 && player.pos.x < enemy.pos.x + enemy.matrix[0].length - 4) &&
        (player.pos.y > enemy.pos.y - enemy.matrix.length + 1 && player.pos.y < enemy.pos.y + enemy.matrix.length)) {
        return true
    }
    return false
}

//////////// <--------> ////////////>- CZY MARIO WSZEDŁ W ŚCIANĘ -<//////////// <--------> ////////////

function collideMove(player) {
    const [m, o] = [player.matrix, player.pos]
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 && (arena[y + o.y - 1] && arena[y + o.y - 1][x + o.x]) !== 0) {
                return true
            }
        }
    }
    return false
}

//////////// <--------> ////////////>- USUWANIE PRZECIWNIKA PO NASKOCZENIU NA NIEGO -<//////////// <--------> ////////////

function headPop(enemy) {
    if (enemy.matrix !== null) {
        if ((player.pos.x > enemy.pos.x - enemy.matrix[0].length && player.pos.x < enemy.pos.x + enemy.matrix[0].length) &&
            (player.pos.y >= enemy.pos.y - enemy.matrix.length && player.pos.y <= enemy.pos.y - enemy.matrix.length + 8)) {
            return true
        }
        return false
    }
}

//////////// <--------> ////////////>- ZNIKANIE PRZECIWNIKA PO NASKOCZENIU NA NIEGO -<//////////// <--------> ////////////

var theEnemy = undefined
var counter = 0
var lastJump
var jp = 1

function enemyDisappear() {
    counter++
    if (counter === 1) {
        lastJump = player.pos.y
    }
    if (counter === 30) {
        if (theEnemy === 1) {
            enemyReset(enemy1)
        }
        if (theEnemy === 2) {
            enemyReset(enemy2)
        }
        if (theEnemy === 3) {
            enemyReset(enemy3)
        }
        if (theEnemy === 4) {
            enemyReset(enemy4)
        }
        lastJump = 0
        counter = 0
    }
    if (counter < 20 && jp === 1) {
        if (player.pos.y < lastJump - 12) {
            jp = 0
        }
        if (jp === 1) {
            player.pos.y -= 2
        }
    }
    if (counter !== 0) {
        requestAnimationFrame(enemyDisappear)
    }
}

//////////// <--------> ////////////>- PORUSZANIE SIĘ PRZECIWNIKA -<//////////// <--------> ////////////

let ruch = 1
let licznik5 = 0
var lastEnemy = undefined
var popwait1 = 0
var popwait2 = 0
var popwait3 = 0
var popwait4 = 0
var bossPop = 1
function enemyMove() {
    licznik5++
    if (licznik5 > ruch) {
        if (theEnemy1 === 1) {
            flames()
            if (bossPop === bossLife) {

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
                
                bossPop = 0
                enemyDisappear()
                popwait1 = 1
                setTimeout(() => window.location = `points/${fullId}`, 4000)
            }
            if (letbos === 1 && level.arena === 9) {
                if (headPop(enemy1)) {
                    if (bossPop !== 0) {
                        bossPop++
                    }
                    letbos = 0
                }
            }
            if (headPop(enemy1)) {
                theEnemy = 1
                if (enemy1.matrix !== enemies[3]) {
                    enemy1.pos.y -= 6
                }
                enemyDisappear()
                popwait1 = 1
                if (enemy1.matrix === enemies[1]) {
                    enemy1.matrix = enemies[2]
                }
            }
            if (popwait1 === 0) {
                if (enemy1.matrix !== enemies[3]) {
                    enemy1.pos.x -= enemySpeed1
                    if (collideMove(enemy1)) {
                        enemy1.pos.x += enemySpeed1
                        enemySpeed1 = - enemySpeed1
                        if (enemy1.matrix !== enemies[6]) {
                            turn(enemy1.matrix)
                        }
                    }
                    if (touchEnemy(enemy1)) {
                        reset()
                    }
                }
            }
        }

        if (theEnemy2 === 1) {
            if (headPop(enemy2)) {
                theEnemy = 2
                if (enemy2.matrix !== enemies[3]) {
                    enemy2.pos.y -= 6
                }
                enemyDisappear()
                popwait2 = 1
            }
            if (popwait2 === 0) {
                if (enemy2.matrix !== enemies[3]) {
                    enemy2.pos.x -= enemySpeed2
                    if (collideMove(enemy2)) {
                        enemy2.pos.x += enemySpeed2
                        enemySpeed2 = - enemySpeed2
                        turn(enemy2.matrix)
                    }
                    if (touchEnemy(enemy2)) {
                        reset()
                    }
                }
            }
        }

        if (theEnemy3 === 1) {
            if (headPop(enemy3)) {
                theEnemy = 3
                if (enemy3.matrix !== enemies[3]) {
                    enemy3.pos.y -= 6
                }
                enemyDisappear()
                popwait3 = 1
            }
            if (popwait3 === 0) {
                if (enemy3.matrix !== enemies[3]) {
                    enemy3.pos.x -= enemySpeed3
                    if (collideMove(enemy3)) {
                        enemy3.pos.x += enemySpeed3
                        enemySpeed3 = - enemySpeed3
                        turn(enemy3.matrix)
                    }
                    if (touchEnemy(enemy3)) {
                        reset()
                    }
                }
            }
        }
        if (theEnemy4 === 1) {
            if (headPop(enemy4)) {
                theEnemy = 4
                if (enemy4.matrix !== enemies[3]) {
                    enemy4.pos.y -= 6
                }
                enemyDisappear()
                popwait4 = 1
            }
            if (popwait4 === 0) {
                if (enemy4.matrix !== enemies[3]) {
                    enemy4.pos.x -= enemySpeed4
                    if (collideMove(enemy4)) {
                        enemy4.pos.x += enemySpeed4
                        enemySpeed4 = - enemySpeed4
                        turn(enemy4.matrix)
                    }
                    if (touchEnemy(enemy4)) {
                        reset()
                    }
                }
            }
        }
        if (theEnemy1 === 1 && enemy1.matrix === enemies[5]) {
            if (headPop(enemy1)) {
                theEnemy = 1
                if (enemy1.matrix !== enemies[3]) {
                    enemy1.pos.y -= 6
                }
                enemyDisappear()
                popwait1 = 1
                if (enemy1.matrix === enemies[1]) {
                    enemy1.matrix = enemies[2]
                }
            }
        }

        licznik5 = 0
    }
}
var letbos = 1
var kierunek = 1
//////////// <--------> ////////////>- SKAKANIE PRZECIWNIKA -<//////////// <--------> ////////////

var skoczek = undefined
function enemyJump() {
    var object2 = skoczek
    if (playerNearby(object2)) {
        object = skoczek
        if (skakanie1 === 1 && skoczek === enemy1) {
            doJump()
        }
        if (skakanie2 === 1 && skoczek === enemy2) {
            doJump()
        }
        if (skakanie3 === 1 && skoczek === enemy3) {
            doJump()
        }
        if (skakanie4 === 1 && skoczek === enemy4) {
            doJump()
        }
    }
}

//////////// <--------> ////////////>- PRZECIWNIK SKACZE GDY MARIO JEST W POBLIŻU -<//////////// <--------> ////////////

function playerNearby(enemyX) {
    var enemy = enemyX
    if (player.pos.x > enemy.pos.x - enemy.matrix[0].length - 25 && player.pos.x < enemy.pos.x + enemy.matrix[0].length + 25) {
        return true
    }
    return false
}

//////////// <--------> ////////////>- SKAKANIE -<//////////// <--------> ////////////

let licznik2 = 1
let spadek2 = 200
let timeM2 = 0
let ilosc = 1
var object = 0
function doJump(time = 0) {
    var model = object
    if (object === player) {
        skakanie = 0
    }
    if (object === enemy1) {
        skakanie1 = 0
    }
    if (object === enemy2) {
        skakanie2 = 0
    }
    if (object === enemy3) {
        skakanie3 = 0
    }
    if (object === enemy4) {
        skakanie4 = 0
    }

    pozwolenie = 0
    const delta = time - timeM2
    timeM2 = time
    licznik2 += delta

    if (licznik2 >= spadek2) {
        if (ilosc !== 0) {
            ilosc++
        }
    }
    if (licznik2 >= spadek2 && ilosc !== 0) {
        model.pos.y -= jump
    }

    if (ilosc !== 0) {
        requestAnimationFrame(doJump)
    }
    if (ilosc === 5) {
        ilosc = 0
    }
    if (ilosc === 0) {
        requestAnimationFrame(gravity)
    }
    if (ilosc === 0) {
        requestAnimationFrame(def)
    }
    if (collide(model)) {
        model.pos.y += jump
        if (collide(model)) {
            while (collide(model)) {
                model.pos.x -= lastDir
            }
        }
        ilosc = 0
    }
}
function def() {
    pozwolenie = 1
    ilosc = 1
}

//////////// <--------> ////////////>- GRAWITACJA -<//////////// <--------> ////////////

let timeM10 = 0
let spadek10 = grawitacja
let licznik10 = 0
function gravity(time = 0) {
    const delta = time - timeM10
    timeM10 = time
    licznik10 += delta

    if (licznik10 > spadek10) {
        player.pos.y++
        licznik10 = 0
        skakanie = 0
        skakanie1 = 0
        skakanie2 = 0
        skakanie3 = 0
        skakanie4 = 0
        if (collide(player)) {
            player.pos.y--
            skakanie = 1
            letbos = 1
        }
        if (enemy1.matrix !== enemies[3]) {
            if (enemy1.matrix !== null) {
                enemy1.pos.y++
                if (collide(enemy1)) {
                    enemy1.pos.y--
                    skakanie1 = 1
                }
            }
        }
        if (enemy2.matrix !== enemies[3]) {
            if (enemy2.matrix !== null) {
                enemy2.pos.y++
                if (collide(enemy2)) {
                    enemy2.pos.y--
                    skakanie2 = 1
                }
            }
        }
        if (enemy3.matrix !== enemies[3]) {
            if (enemy3.matrix !== null) {
                enemy3.pos.y++
                if (collide(enemy3)) {
                    enemy3.pos.y--
                    skakanie3 = 1
                }
            }
        }
        if (enemy4.matrix !== enemies[3]) {
            if (enemy4.matrix !== null) {
                enemy4.pos.y++
                if (collide(enemy4)) {
                    enemy4.pos.y--
                    skakanie4 = 1
                }
            }
        }
    }
}
var pozwolenie = 1
function spadek() {
    if (pozwolenie === 1) {
        requestAnimationFrame(gravity)
    }
    requestAnimationFrame(spadek)
}
spadek()

//////////// <--------> ////////////>- CZY AKTYWOWAĆ GRAWITACJE -<//////////// <--------> ////////////

function physics() {
    if (collide(player) ? null : () => {
        requestAnimationFrame(gravity)
    }) { }

    if (speed > defSpeed * 2 || speed < defSpeed) {
        speed = defSpeed
    }
    if (jump > defJump || jump < defJump - 2) {
        jump = defJump
    }
    if (jump === 4) {
        jump = 6
    }

    if (walking === 1) {
        if (direction === 1) {
            playerMove(speed)
            if (letting === 1 && go === 1) {
                turn(mario)
                letting = 0
            }
            go = 2
            if (collide(player)) {
                go = 1
            }
        }
        if (direction === 2) {
            playerMove(-speed)
            if (letting === 1 && go === 2) {
                turn(mario)
                letting = 0
            }
            go = 1
            if (collide(player)) {
                go = 2
            }
        }
    }
}

//////////// <--------> ////////////>- CHODZENIE -<//////////// <--------> ////////////

function playerMove(dir) {
    player.pos.x += dir
    if (collideMove(player)) {
        player.pos.x -= dir
    }
}

//////////// <--------> ////////////>- STEROWANIE -<//////////// <--------> ////////////

var skakanie = 1
var skakanie1 = 1
var skakanie2 = 1
var skakanie3 = 1
var skakanie4 = 1
var lastDir = 1
var walking = 0
var direction = 0
var letting = 1
var go = 2
window.addEventListener("keypress", (e) => {
    if (e.key === "d") {
        lastDir = 1
        direction = 1
        walking = 1
    }
    if (e.key === "a") {
        lastDir = -1
        direction = 2
        walking = 1
    }
    if (e.key === "w") {
        if (skakanie === 1) {
            object = player
            jp = 1
            doJump()
        }
    }
    if (e.key === "p" || e.key === "q") {
        speed *= 2
        jump--
    }
    if (e.key === "l") {
        turn(mario)
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key === "d") {
        direction = 0
        walking = 0
        letting = 1
    }
    if (e.key === "a") {
        direction = 0
        walking = 0
        letting = 1
    }
    if (e.key === "p" || e.key === "q") {
        speed /= 2
        jump++
    }
})

//////////// <--------> ////////////>- RYSOWANIE ELEMENTÓW ZAPISANYCH NA ARENIE -<//////////// <--------> ////////////

function drawArena() {
    arena.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 0) {
                ctx.fillStyle = bgcolor
                x += x
                ctx.fillRect(x, y, size, size)
            }
            if (value !== 0) {
                ctx.fillStyle = colors[value]
                ctx.fillRect(x, y, size, size)
            }
        })
    })
}

//////////// <--------> ////////////>- RYSOWANIE MODELU -<//////////// <--------> ////////////

function drawModel(model, offset) {
    model.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = modelColor[value]
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1)
            }
        })
    })
    if (model === mario) {
        ctx.fillStyle = modelColor[4]
        ctx.fillRect(12 + offset.x, 4 + offset.y, 1, 1)
    }
}

function turn(model) {
    for (let y = 0; y < model.length; ++y) {
        model[y].reverse()
    }
}



//////////// <--------> ////////////>- RYSOWANIE PRZECIWNIKÓW -<//////////// <--------> ////////////

var theEnemy1 = 0
var theEnemy2 = 0
var theEnemy3 = 0
var theEnemy4 = 0
function drawEnemy(enemy1, enemy2, enemy3, enemy4) {
    if (enemy1.matrix !== null) {
        drawModel(enemy1.matrix, enemy1.pos)
        theEnemy1 = 1
    } else {
        theEnemy1 = 0
    }
    if (enemy2.matrix !== null) {
        drawModel(enemy2.matrix, enemy2.pos)
        theEnemy2 = 1
    } else {
        theEnemy2 = 0
    }
    if (enemy3.matrix !== null) {
        drawModel(enemy3.matrix, enemy3.pos)
        theEnemy3 = 1
    } else {
        theEnemy3 = 0
    }
    if (enemy4.matrix !== null) {
        drawModel(enemy4.matrix, enemy4.pos)
        theEnemy4 = 1
    } else {
        theEnemy4 = 0
    }
    if (enemy1.matrix !== null || enemy2.matrix !== null || enemy3.matrix !== null || enemy4.matrix !== null) {
        enemyMove()
    }
}

//////////// <--------> ////////////>- WSZYSTKIE OBIEKTY DO NARYSOWANIA <-//////////// <--------> ////////////

function draw() {
    drawbg()
    drawArena()
    text()
    drawEnemy(enemy1, enemy2, enemy3, enemy4)
    drawModel(player.matrix, player.pos)
}

//////////// <--------> ////////////>- ODŚWIEŻANIE STANU GRY -<//////////// <--------> ////////////

function update() {
    draw()
    physics()
    nextLevel()
}
setInterval(update, 1000 / fps)