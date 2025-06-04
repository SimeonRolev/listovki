import React from 'react';
import './Crossroads.css';
import { Position } from '../models/index.js';

const Crossroads = ({ task }) => {
  const myCar = task.getMyCar();
  const otherCars = task.getOtherCars();
  
  const renderCar = (car) => {
    if (!car) return null;
    
    return (
      <div 
        className={`car`}
        style={{ backgroundColor: car.color }}
      >
        <div className="car-body"></div>
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
        <div className='road-container road-bottom'>
            <div className='road'>
                {renderCar(myCar)}
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
