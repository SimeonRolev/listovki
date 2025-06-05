import React from 'react';
import './Crossroads.css';
import { Turn, TrafficSign, DirectionSign, Position } from '../models/index.js';
import Solution from '../models/Solution.js';

const Car = ({ car, turnArrows }) => {
    if (!car) return null;
    return (
        <>
            <div
                className='car'
                style={{ backgroundColor: car.color }}
            />
            {turnArrows && (
                car.turn === Turn.STRAIGHT
                    ? <div className='arrow arrow-straight' />
                    : <div
                        className='arrow arrow-left'
                        style={{ transform: car.turn === Turn.RIGHT ? 'scaleX(-1)' : '' }}
                    />
            )}
        </>
    );
}

const Crossroads = ({ task }) => {
    const myCar = task.myCar;
    const otherCars = task.cars.filter(car => car.position !== 'me');
    const solution = new Solution(task);
    const { sortedCars } = solution.getOrder();
    const [priorityRoadCars, nonPriorityRoadCars] = sortedCars.reduce((acc, car) => {
        acc[solution.onPriorityRoad(car) ? 0 : 1].push(car)
        return acc;
    }, [[], []]);

    const renderTrafficSign = (sign) => {
        if (sign === TrafficSign.NONE) return null;

        return (
            <div className={"sign traffic-sign traffic-sign-" + sign} />
        );
    };

    const renderDirectionSign = (directionSign) => {
        if (!directionSign.directions) return null;

        return (
            <>
                {/* {directionSign.directions} */}
                <img
                    src='/direction-sign-se.png'
                    alt='Direction Sign South East'
                    className={`sign direction-sign`}
                    style={{
                        transform: `rotate(${directionSign.directions === DirectionSign.NW ? 0 :
                            directionSign.directions === DirectionSign.NE ? 90 :
                                directionSign.directions === DirectionSign.SW ? 270 :
                                    directionSign.directions === DirectionSign.SE ? 180 :
                                        0
                            }deg)`,
                    }}
                />
            </>
        );
    };

    // Get cars by position for direct access
    const eastCar = otherCars.find(car => car.position === Position.EAST);
    const westCar = otherCars.find(car => car.position === Position.WEST);
    const northCar = otherCars.find(car => car.position === Position.NORTH);

    return (
        <div className="crossroads-container">
            <div className="crossroads">
                <div className='road-container road-south'>
                    <div className='road'>
                        <Car car={myCar}  turnArrows={true} />
                        {renderTrafficSign(task.trafficSign)}
                        {renderDirectionSign(task.directionSign)}
                    </div>
                </div>
                <div className='road-container'>
                    <div className='road'>
                        <Car car={northCar}  turnArrows={true} />
                    </div>
                </div>
                <div className='road-container road-west'>
                    <div className='road'>
                        <Car car={westCar}  turnArrows={true} />
                    </div>
                </div>

                <div className='road-container road-east'>
                    <div className='road'>
                        <Car car={eastCar}  turnArrows={true} />
                    </div>
                </div>
            </div>
            <div className='explanation'>
                {
                    task.trafficSign !== TrafficSign.NONE &&
                    priorityRoadCars.length > 0 &&
                    <h3 style={{ marginBottom: 0 }}>Път с предимство:</h3>
                }
                {priorityRoadCars.map((car, index) => (
                    <div key={index} className='explanation-item'>
                        <b style={{ marginRight: 10 }}>{priorityRoadCars.length + index + 1} - </b>
                        {[...car.equals].map(c => <Car car={c} />)}
                        <div class='explanation-text'>
                            {car.reason && <div style={{ marginLeft: 10 }}>{car.reason}</div>}
                        </div>
                    </div>
                ))}
                {task.trafficSign === TrafficSign.NONE &&
                    <>
                        <h3 style={{ marginBottom: 0 }}>Няма знаци:</h3>
                        <div style={{ marginBottom: 10 }}>
                            Прилагаме правилата за: <br />
                            1. дясностоящ<br />
                            2. При насрещни, завиващият наляво изчаква.
                        </div>
                    </>
                }
                {
                    task.trafficSign !== TrafficSign.NONE &&
                    nonPriorityRoadCars.length > 0 &&
                    <h3 style={{ marginBottom: 0 }}>Път без предимство:</h3>
                }
                {nonPriorityRoadCars.map((car, index) => (
                    <div key={index} className='explanation-item'>
                        <b style={{ marginRight: 10 }}>{priorityRoadCars.length + index + 1} - </b>
                        {[...car.equals].map(c => <Car car={c} />)}
                        <div class='explanation-text'>
                            {car.reason && <div style={{ marginLeft: 10 }}>{car.reason}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Crossroads;
