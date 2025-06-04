import React from 'react';
import './Crossroads.css';
import { Position } from '../models/index.js';

const Crossroads = ({ task }) => {
  const cars = task.getAllCars();
  
  const getCarByPosition = (position) => {
    return cars.find(car => car.position === position);
  };

  const renderCar = (car, position) => {
    if (!car) return null;
    
    return (
      <div 
        key={position}
        className={`car car-${car.color} car-position-${position}`}
        title={`${car.color} car going ${car.turn}`}
      >
        <div className="car-body"></div>
        <div className={`turn-indicator turn-${car.turn}`}>
          {car.turn === 'left' && '←'}
          {car.turn === 'right' && '→'}
          {car.turn === 'straight' && '↑'}
        </div>
      </div>
    );
  };

  return (
    <div className="crossroads-container">
      <div className="crossroads">
        {/* Horizontal road */}
        <div className="road horizontal-road">
          {/* Left car */}
          <div className="car-slot left-slot">
            {renderCar(getCarByPosition(Position.LEFT), 'left')}
          </div>
          
          {/* Right car */}
          <div className="car-slot right-slot">
            {renderCar(getCarByPosition(Position.RIGHT), 'right')}
          </div>
        </div>
        
        {/* Vertical road */}
        <div className="road vertical-road">
          {/* Front car */}
          <div className="car-slot front-slot">
            {renderCar(getCarByPosition(Position.FRONT), 'front')}
          </div>
          
          {/* My car (bottom) */}
          <div className="car-slot me-slot">
            {renderCar(getCarByPosition(Position.ME), 'me')}
          </div>
        </div>
        
        {/* Intersection center */}
        <div className="intersection-center"></div>
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
