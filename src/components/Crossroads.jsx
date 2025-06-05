import React from 'react';
import './Crossroads.css';
import { Turn, TrafficSign, DirectionSign } from '../models/index.js';

const Crossroads = ({ task }) => {
    const myCar = task.myCar;
    const otherCars = task.cars.filter(car => car.position !== 'me');

    const renderCar = (car) => {
        if (!car) return null;

        return (
            <>
                <div className='car' style={{ backgroundColor: car.color }} />
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
        if (!directionSign) return null;

        return (
            <>
            {/* {directionSign.directions} */}
            <img
                src='/direction-sign-se.png'
                alt='Direction Sign South East'
                className={`sign direction-sign`}
                style={{
                    transform: `rotate(${
                        directionSign.directions === DirectionSign.NW ? 0 :
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
    const leftCar = otherCars.find(car => car.position === 'left');
    const rightCar = otherCars.find(car => car.position === 'right');
    const frontCar = otherCars.find(car => car.position === 'front');

    return (
        <div className="crossroads-container">
            <div className="crossroads">
                <div className='road-container road-bottom'>
                    <div className='road'>
                        {renderCar(myCar)}
                        {renderTrafficSign(task.trafficSign)}
                        {renderDirectionSign(task.directionSign)}
                    </div>
                </div>
                <div className='road-container'>
                    <div className='road'>
                        {renderCar(frontCar)}
                    </div>
                </div>
                <div className='road-container road-right'>
                    <div className='road'>
                        {renderCar(rightCar)}
                    </div>
                </div>
                
                <div className='road-container road-left'>
                    <div className='road'>
                        {renderCar(leftCar)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crossroads;
