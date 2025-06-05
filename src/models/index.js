
// Enum for position - east, west, north, south
const Position = {
    EAST: 'east',
    WEST: 'west',
    NORTH: 'north',
    SOUTH: 'south'
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

// Enum for traffic signs
const TrafficSign = {
    RIGHT_OF_WAY: 'right-of-way',
    GIVE_WAY: 'give-way',
    STOP: 'stop',
    NONE: 'none'
};

const DirectionSign = {
    NW: 'north-west',
    NE: 'north-east',
    SW: 'south-west',
    SE: 'south-east'
}

class Car {
    constructor(position = Position.SOUTH, turn = Turn.STRAIGHT, color) {
        this.position = position; // Position of the car
        this.turn = turn; // Direction the car is turning
        this.color = color; // Color of the car
    }
}

class WayDirectionSign {
    constructor(iHaveWay = null) {
        this.iHaveWay = iHaveWay; // Indicates if the car has the right of way
        this.directions = iHaveWay === true
            ? Math.random() < 0.5 ? DirectionSign.SW : DirectionSign.SE
            : iHaveWay === false
                ? Math.random() < 0.5 ? DirectionSign.NW : DirectionSign.NE
                : null
    }
}

// Export all classes and enums
export { Car, Position, Turn, Color, TrafficSign, WayDirectionSign, DirectionSign };
