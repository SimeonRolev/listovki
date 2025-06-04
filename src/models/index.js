
// Enum for position - left, right, front
const Position = {
    LEFT: 'left',
    RIGHT: 'right',
    FRONT: 'front',
    ME: 'me'
};

// Enum for turn - left, right
const Turn = {
    LEFT: 'left',
    RIGHT: 'right',
    STRAIGHT: 'straight'
};

const Color = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
}

class Car {
    constructor(position = Position.ME, turn = Turn.STRAIGHT, color) {
        this.position = position; // Position of the car
        this.turn = turn; // Direction the car is turning
        this.color = color; // Color of the car
    }
}

// Export all classes and enums
export { Car, Position, Turn, Color };
