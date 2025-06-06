
// Enum for position - east, west, north, south
const Position = {
    EAST: 'east',
    WEST: 'west',
    NORTH: 'north',
    SOUTH: 'south'
};

function getRightStandingPosition (position) {
    switch (position) {
        case Position.EAST:
            return Position.NORTH;
        case Position.NORTH:
            return Position.WEST;
        case Position.WEST:
            return Position.SOUTH;
        case Position.SOUTH:
            return Position.EAST;
        default:
            throw new Error(`Invalid position: ${position}`);
    }
}
window.getRightStandingPosition = getRightStandingPosition;

function getOppositeStandingPosition (position) {
    switch (position) {
        case Position.EAST:
            return Position.WEST;
        case Position.WEST:
            return Position.EAST;
        case Position.NORTH:
            return Position.SOUTH;
        case Position.SOUTH:
            return Position.NORTH;
        default:
            throw new Error(`Invalid position: ${position}`);
    }
}
window.getOppositeStandingPosition = getOppositeStandingPosition;
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

export function t (value) {
    switch (value) {
        case Position.EAST:
            return 'Изток';
        case Position.WEST:
            return 'Запад';
        case Position.NORTH:
            return 'Север';
        case Position.SOUTH:
            return 'Юг';
        case Turn.LEFT:
            return 'Наляво';
        case Turn.RIGHT:
            return 'Надясно';
        case Turn.STRAIGHT:
            return 'Направо';
        case Color.RED:
            return 'Червен';
        case Color.BLUE:
            return 'Син';
        case Color.GREEN:
            return 'Зелен';
        case Color.YELLOW:
            return 'Жълт';
        default:
            return value;
    }
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
    constructor({trafficSign = TrafficSign.NONE} = {}) {
        if (
            trafficSign === TrafficSign.NONE ||
            Math.random() < 0.5 // 50% chance of no direction sign
        ) {
            this.directions = null;
            return;
        }

        if (trafficSign === TrafficSign.RIGHT_OF_WAY) {
            this.directions = Math.random() < 0.5 ? DirectionSign.SW : DirectionSign.SE
            return;
        }

        if (trafficSign === TrafficSign.GIVE_WAY || trafficSign === TrafficSign.STOP) {
            this.directions = Math.random() < 0.5 ? DirectionSign.NW : DirectionSign.NE
            return;
        }
    }
}

// Export all classes and enums
export { Car, Position, Turn, Color, TrafficSign, WayDirectionSign, DirectionSign, getRightStandingPosition, getOppositeStandingPosition };
