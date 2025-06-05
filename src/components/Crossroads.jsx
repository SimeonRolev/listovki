import React from 'react';
import './Crossroads.css';
import { Turn, TrafficSign, DirectionSign } from '../models/index.js';

const Crossroads = ({ task }) => {
    const myCar = task.getMyCar();
    const otherCars = task.getOtherCars();

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
            <div className={"traffic-sign traffic-sign-" + sign} />
        );
    };

    const renderDirectionSign = (directionSign) => {
        if (!directionSign) return null;

        const directions = directionSign.directions;
        const isNorthBold = directions === DirectionSign.NW || directions === DirectionSign.NE;
        const isSouthBold = directions === DirectionSign.SW || directions === DirectionSign.SE;
        const isWestBold = directions === DirectionSign.NW || directions === DirectionSign.SW;
        const isEastBold = directions === DirectionSign.NE || directions === DirectionSign.SE;

        return (
            <div className="direction-sign">
                <div className={`direction-letter ${isNorthBold ? 'bold' : ''}`}>N</div>
                <div className="direction-row">
                    <div className={`direction-letter ${isWestBold ? 'bold' : ''}`}>W</div>
                    <div className={`direction-letter ${isEastBold ? 'bold' : ''}`}>E</div>
                </div>
                <div className={`direction-letter ${isSouthBold ? 'bold' : ''}`}>S</div>
            </div>
        );
    };

    // Get cars by position
    const getCarByPosition = (position) => {
        return otherCars.find(car => car.position === position);
    };

    const leftCar = getCarByPosition('left');
    const rightCar = getCarByPosition('right');
    const frontCar = getCarByPosition('front');

    return (
        <div className="crossroads-container">
            <div className="crossroads">
                <div className='road-container road-bottom'>
                    <div className='road'>
                        {renderCar(myCar)}
                        {renderTrafficSign(task.getTrafficSign())}
                        {renderDirectionSign(task.getDirectionSign())}
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

            {/* Task description */}
            <div className="task-info">
                <h3>Current Task</h3>
                <pre>{task.getDescription()}</pre>
            </div>
        </div>
    );
};

export default Crossroads;
