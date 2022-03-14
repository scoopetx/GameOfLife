function func_randomize_world () {
    for (let cell_id = 0; cell_id <= 24; cell_id++) {
        world[cell_id] = randint(0, 1)
    }
}
function func_init () {
    generation = 0
    world = [25]
    world2 = [25]
    friends_matrix = [
    [-1, -1, -6],
    [0, -1, -5],
    [1, -1, -4],
    [-1, 0, -1],
    [1, 0, 1],
    [-1, 1, 4],
    [0, 1, 5],
    [1, 1, 6]
    ]
}
function func_render () {
    basic.clearScreen()
    for (let cell_id2 = 0; cell_id2 <= 24; cell_id2++) {
        if (world[cell_id2]) {
            led.plot(cell_id2 - 5 * Math.abs(Math.idiv(cell_id2, 5)), Math.abs(Math.idiv(cell_id2, 5)))
        }
    }
}
function func_next_generation () {
    for (let cell_id3 = 0; cell_id3 <= 24; cell_id3++) {
        friends = 0
        for (let offset of friends_matrix) {
            target_cell_x = cell_id3 - 5 * Math.abs(Math.idiv(cell_id3, 5)) + offset[0]
            target_cell_y = Math.abs(Math.idiv(cell_id3, 5)) + offset[1]
            target_cell_id = cell_id3 + offset[2]
            if (target_cell_x >= 0 && target_cell_x < 5 && (target_cell_y >= 0 && target_cell_y < 5)) {
                if (world[target_cell_id]) {
                    friends += 1
                }
            }
        }
        new_cell = 0
        if (world[cell_id3]) {
            if (friends < 2 || friends > 3) {
                new_cell = 0
            } else {
                new_cell = 1
            }
        } else if (friends == 3) {
            new_cell = 1
        }
        world2[cell_id3] = new_cell
    }
    generation += 1
}
input.onButtonPressed(Button.A, function () {
    func_randomize_world()
    func_render()
})
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
})
function func_swap_worlds () {
    for (let cell_id4 = 0; cell_id4 <= 24; cell_id4++) {
        world[cell_id4] = world2[cell_id4]
    }
}
let new_cell = 0
let target_cell_id = 0
let target_cell_y = 0
let target_cell_x = 0
let friends = 0
let friends_matrix: number[][] = []
let world2: number[] = []
let generation = 0
let world: number[] = []
func_init()
func_randomize_world()
func_render()
basic.forever(function () {
    while (input.buttonIsPressed(Button.B)) {
        func_next_generation()
        func_swap_worlds()
        func_render()
        basic.pause(200)
    }
})
