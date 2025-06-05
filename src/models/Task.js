// Import the Car class and enums from the index file
import { Car, Position, Turn, Color, TrafficSign, WayDirectionSign } from './index.js';

class Task {
    constructor() {
        this.cars = [];
        this.myCar = null;
        this.availableColors = Object.values(Color);
        this.usedColors = new Set();
        
        // Initialize signs
        this.trafficSign = TrafficSign.NONE;
        this.directionSign = null;
        
        // Always create "my car" at Position.SOUTH
        this.createMyCar();
    }

    createMyCar() {
        // My car is always at Position.SOUTH
        const color = this.getRandomAvailableColor();
        const turn = this.getRandomTurn();
        this.myCar = new Car(Position.SOUTH, turn, color);
        this.cars.push(this.myCar);
    }

    addCar(position, turn, color = null) {
        // Validate position (cannot be SOUTH as that's reserved for my car)
        if (position === Position.SOUTH) {
            throw new Error("Position.SOUTH is reserved for my car");
        }

        // Validate we don't exceed 3 cars total (including my car)
        if (this.cars.length >= 4) {
            throw new Error("Cannot have more than 4 cars total (including my car)");
        }

        // Check if position is already occupied
        if (this.cars.some(car => car.position === position)) {
            throw new Error(`Position ${position} is already occupied`);
        }

        // Assign color if not provided, or validate if provided
        if (color === null) {
            color = this.getRandomAvailableColor();
        } else {
            if (this.usedColors.has(color)) {
                throw new Error(`Color ${color} is already used`);
            }
        }

        const newCar = new Car(position, turn, color);
        this.cars.push(newCar);
        this.usedColors.add(color);
        
        return newCar;
    }

    getRandomAvailableColor() {
        const availableColors = this.availableColors.filter(color => !this.usedColors.has(color));
        
        if (availableColors.length === 0) {
            throw new Error("No more colors available");
        }

        const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
        this.usedColors.add(randomColor);
        return randomColor;
    }

    getRandomTurn() {
        const turns = Object.values(Turn);
        return turns[Math.floor(Math.random() * turns.length)];
    }

    generateTrafficSign() {
        const signs = Object.values(TrafficSign);
        this.trafficSign = signs[Math.floor(Math.random() * signs.length)];
        
        // Create direction sign based on traffic sign
        this.generateDirectionSign();
        
        return this.trafficSign;
    }

    generateDirectionSign() {
        this.directionSign = new WayDirectionSign({trafficSign: this.trafficSign});
        return this.directionSign;
    }

    getRandomPosition() {
        // Exclude Position.SOUTH as it's reserved for my car
        const availablePositions = [Position.EAST, Position.WEST, Position.NORTH];
        const occupiedPositions = this.cars.map(car => car.position);
        const freePositions = availablePositions.filter(pos => !occupiedPositions.includes(pos));
        
        if (freePositions.length === 0) {
            throw new Error("No free positions available");
        }

        return freePositions[Math.floor(Math.random() * freePositions.length)];
    }

    // Create a random task with 1-3 other cars (plus my car)
    generateRandomTask() {
        // Reset cars to just my car
        this.cars = [this.myCar];
        this.usedColors = new Set([this.myCar.color]);

        // Add 1-3 additional cars
        const numOtherCars = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3

        for (let i = 0; i < numOtherCars; i++) {
            try {
                const position = this.getRandomPosition();
                const turn = this.getRandomTurn();
                this.addCar(position, turn);
            } catch {
                // If we can't add more cars (no positions or colors), stop
                break;
            }
        }

        // Generate signs (traffic sign will automatically generate direction sign)
        this.generateTrafficSign();

        return this;
    }




}

export default Task;
