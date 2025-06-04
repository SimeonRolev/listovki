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
        className={`car car-${car.color}`}
        title={`${car.position} ${car.color} car going ${car.turn}`}
      >
        <div className="car-body"></div>
      </div>
    );
  };

  const renderMyCar = () => {
    return renderCar(myCar);
  };

  const renderTurnIndicator = (car, quadrant) => {
    if (!car) return null;
    
    return (
      <div className={`turn-indicator turn-${car.turn} ${quadrant}`}>
        {/* Arrow shape created with CSS pseudo-elements */}
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
                <div className='car' style={{ backgroundColor: 'red' }} />
            </div>
        </div>
        <div className='road-container road-right'>
            <div className='road'>
                <div className='car' style={{ backgroundColor: 'red' }} />
            </div>
        </div>
        <div className='road-container road-bottom'>
            <div className='road'>
                <div className='car' style={{ backgroundColor: 'red' }} />
            </div>
        </div>
        <div className='road-container road-left'>
            <div className='road'>
                <div className='car' style={{ backgroundColor: 'red' }} />
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
