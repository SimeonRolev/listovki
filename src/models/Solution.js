import { TrafficSign, Position } from './index.js';

class Solution {
    constructor(task) {
        this.task = task;
    }

    hasRightOfWay (car) {
        if (this.task.trafficSign === TrafficSign.NONE) return false;
        if (this.task.directionSign.directions) {
            return this.task.directionSign.directions.includes(car.position);
        } else {
            // No direction sign
            if (this.task.trafficSign === TrafficSign.RIGHT_OF_WAY) {
                return [Position.SOUTH, Position.NORTH].includes(car.position);
            }

            if (this.task.trafficSign === TrafficSign.GIVE_WAY || this.task.trafficSign === TrafficSign.STOP) {
                return [Position.EAST, Position.WEST].includes(car.position);
            }
        }
    }
}

export default Solution;
