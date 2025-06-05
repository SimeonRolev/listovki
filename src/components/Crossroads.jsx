import React from 'react';
import './Crossroads.css';
import { Turn, TrafficSign, DirectionSign, Position } from '../models/index.js';
import Solution from '../models/Solution.js';

const Arrow = ({ turn }) => !turn ? null : <div className={`arrow arrow-${turn}`} />

const Car = ({ car }) => {
    if (!car) return null;
    return (
        <div
            className='car'
            style={{ backgroundColor: car.color }}
        />
    );
}

const Road = ({ position, car, children }) => {
    return (
        <div className={`road-container road-${position}`}>
            {car && <Arrow turn={car.turn} />}
            {car && <Car car={car} />}
            <div className='road' />
            {children}
        </div>
    )
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
                <Road position={Position.SOUTH} car={myCar}>
                    {renderTrafficSign(task.trafficSign)}
                    {renderDirectionSign(task.directionSign)}
                </Road>
                <Road position={Position.NORTH} car={northCar} />
                <Road position={Position.WEST} car={westCar} />
                <Road position={Position.EAST} car={eastCar} />
            </div>
            <div className='explanation'>
                {
                    task.trafficSign !== TrafficSign.NONE &&
                    priorityRoadCars.length > 0 &&
                    <h3 style={{ marginBottom: 0 }}>Път с предимство:</h3>
                }
                {priorityRoadCars.map((car, index) => (
                    <div key={index} className='explanation-item'>
                        <b style={{ marginRight: 10 }}>{index + 1} - </b>
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
