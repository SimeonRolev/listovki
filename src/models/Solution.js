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
window.areSetsEqual = areSetsEqual;
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

    solve() {
        if (this.task.cars.length === 4 && this.task.trafficSign === TrafficSign.NONE) {
            throw new Error('Cannot determine order with 4 cars and no traffic sign - right-standing loop.');
        }

        window.task = this.task;

        const [priorityRoadCars, nonPriorityRoadCars] = this.task.cars
            .slice()
            .reduce((acc, car) => {
                car.equals = new Set([car]);
                acc[this.onPriorityRoad(car) ? 0 : 1].push(car)
                return acc;
            }, [[], []])
            .map(priorityGroup => {
                return priorityGroup
                    .sort((a, b) => {
                        const positionSet = new Set([a.position, b.position]);
                        const opposite =
                            (positionSet.has(Position.EAST) && positionSet.has(Position.WEST)) ||
                            (positionSet.has(Position.NORTH) && positionSet.has(Position.SOUTH));
                        const neighbouring = !opposite;

                        if (neighbouring) {
                            if (getRightStandingPosition(a.position) === b.position) {
                                b.reason = `Дясностоящ на ${t(a.color)}`;
                                return 1;
                            }

                            if (getRightStandingPosition(b.position) === a.position) {
                                a.reason = `Дясностоящ на ${t(b.color)}`;
                                return -1;
                            }
                        } else {
                            if (getOppositeStandingPosition(a.position) === b.position) {
                                if (priorityGroup.length === 2) {
                                    if (a.turn === 'left' && b.turn === 'left') {
                                        throw new Error('Both cars cannot turn left at the same time when facing each other and have the same priority.');
                                    }

                                    if (a.turn === 'left') {
                                        // B wins
                                        a.reason = 'Нарещни, с еднакво предимство - завиващият наляво чака';
                                        return 1;
                                    }
                                    if (b.turn === 'left') {
                                        // A wins
                                        b.reason = 'Нарещни, с еднакво предимство - завиващият наляво чака';
                                        return -1;
                                    }

                                    a.equals.add(b);
                                    b.equals.add(a);
                                    a.reason = 'Нарещни, с еднакво предимство - няма завиващи наляво';
                                    b.reason = 'Нарещни, с еднакво предимство - няма завиващи наляво';
                                } else {
                                    if (
                                        priorityGroup.map(c => c.position).includes(getRightStandingPosition(a.position)) &&
                                        !priorityGroup.map(c => c.position).includes(getRightStandingPosition(b.position))
                                    ) {
                                        b.reason = `Най-десен от всички`;
                                        return 1;
                                    }

                                    if (
                                        !priorityGroup.map(c => c.position).includes(getRightStandingPosition(a.position)) &&
                                        priorityGroup.map(c => c.position).includes(getRightStandingPosition(b.position))
                                    ) {
                                        a.reason = `Най-десен от всички`;
                                        return -1;
                                    }
                                }
                            }
                        }
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
            })

        return {
            sortedCars: priorityRoadCars.concat(nonPriorityRoadCars),
            priorityRoadCars,
            nonPriorityRoadCars,
        };
    }
}

export default Solution;
