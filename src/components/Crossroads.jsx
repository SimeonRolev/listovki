import React from 'react';
import './Crossroads.css';
import { Turn, TrafficSign, DirectionSign, Position } from '../models/index.js';
import Solution from '../models/Solution.js';

const Crossroads = ({ task }) => {
    const myCar = task.myCar;
    const otherCars = task.cars.filter(car => car.position !== 'me');
    const solution = new Solution(task);
    const orderedCars = solution.getOrder().map(car => car.color);

    const renderCar = (car) => {
        if (!car) return null;

        return (
            <>
                <div
                    className='car'
                    style={{
                        backgroundColor: car.color,
                        // border: solution.hasRightOfWay(car) ? ' px solid green' : ''
                    }}
                >
                    <div
                        className='right-of-way'
                        style={{
                            backgroundColor: solution.hasRightOfWay(car) ? 'green' : 'red',
                        }}
                    >
                        {orderedCars.indexOf(car.color) + 1}
                    </div>
                </div>
                {car.turn !== Turn.STRAIGHT ? (
                    <div
                        className='arrow arrow-left'
                        style={{ transform: car.turn === Turn.RIGHT ? 'scaleX(-1)' : '' }}
                    />
                ) : (
                    <div className='arrow arrow-straight' />
                )}
            </>
        );
    };

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
                        {renderCar(myCar)}
                        {renderTrafficSign(task.trafficSign)}
                        {renderDirectionSign(task.directionSign)}
                    </div>
                </div>
                <div className='road-container'>
                    <div className='road'>
                        {renderCar(northCar)}
                    </div>
                </div>
                <div className='road-container road-west'>
                    <div className='road'>
                        {renderCar(westCar)}
                    </div>
                </div>

                <div className='road-container road-east'>
                    <div className='road'>
                        {renderCar(eastCar)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crossroads;
