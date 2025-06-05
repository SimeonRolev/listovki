import { TrafficSign, Position, getRightStandingPosition, getOppositeStandingPosition, t } from './index.js';

/**
 * Compares two sets for equality.
 * @param {Set} set1 - The first set to compare.
 * @param {Set} set2 - The second set to compare.
 * @returns {boolean} - True if sets contain the same elements, false otherwise.
 */
function areSetsEqual(set1, set2) {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
        if (!set2.has(item)) return false;
    }
    return true;
}

class Solution {
    constructor(task) {
        this.task = task;
    }

    onPriorityRoad(car) {
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

    /* 
        Edge cases:
        4 cars, no signs => all should comply to the right-standing rule => loop
        2 or more cars not interfering in any way => id (ex, 2 facing cars, none gets a left turn). Is that even an issue? Still priorities work the same
        2 confronting cars, both taking a left turn => both should wait => conflict
    */
    getOrder() {
        const sortedCars = this.task.cars
            .slice()
            .map(car => {
                car.equals = new Set([car]);
                return car;
            })
            .sort((a, b) => {
            // If one has priority over the other, it goes first
            if (this.onPriorityRoad(a) && !this.onPriorityRoad(b)) return -1;
            if (!this.onPriorityRoad(a) && this.onPriorityRoad(b)) return 1;

            if (getRightStandingPosition(a.position) === b.position) {
                // B sits right of A => B Wins
                b.reason = `Дясностоящ на ${t(a.color)} => с предимство`;
                return 1;
            }

            if (getRightStandingPosition(b.position) === a.position) {
                // A sits right of B => A Wins
                a.reason = `Дясностоящ на ${t(b.color)} => с предимство`;
                return -1;
            }

            if (getOppositeStandingPosition(a.position) === b.position) {
                if (a.turn === 'left' && b.turn === 'left') {
                    return 0;
                }

                if (a.turn === 'left') {
                    // B wins
                    a.reason = 'Завива наляво => чака';
                    return 1;
                }
                if (b.turn === 'left') {
                    // A wins
                    b.reason = 'Завива наляво => чака';
                    return -1;
                }
            }

            a.equals.add(b);
            b.equals.add(a);

            return 0;
        }).reduce((acc, car) => {
            // Check if car is already in accumulator with equal 'equals' set
            const existingCar = acc.find(existingCar => 
                areSetsEqual(existingCar.equals, car.equals)
            );

            // Only add the car if there's no car with the same equals set
            if (!existingCar) {
                acc.push(car);
            }

            return acc;
        }, [])

        return {
            sortedCars
        };
    }
}

export default Solution;
