import React from 'react';
import './Crossroads.css';
import { Turn, TrafficSign, DirectionSign, Position } from '../models/index.js';
import SolutionModel from '../models/Solution.js';
import Solution from './Solution.jsx';

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
    const solution = new SolutionModel(task);
    const { priorityRoadCars, nonPriorityRoadCars } = solution.getOrder();

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
            <Solution 
                task={task}
                priorityRoadCars={priorityRoadCars}
                nonPriorityRoadCars={nonPriorityRoadCars}
            />
        </div>
    );
};

export default Crossroads;
