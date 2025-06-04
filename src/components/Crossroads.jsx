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
      </div>
    );
  };

  const renderTurnIndicator = (car, position) => {
    if (!car) return null;
    
    const getArrowSymbol = (turn, carPosition) => {
      if (turn === 'straight') {
        // Different straight arrows based on car direction
        switch (carPosition) {
          case 'left': return '→';
          case 'right': return '←'; 
          case 'front': return '↓';
          case 'me': return '↑';
          default: return '↑';
        }
      } else if (turn === 'left') {
        return '↶'; // Curved left arrow
      } else if (turn === 'right') {
        return '↷'; // Curved right arrow
      }
      return '↑';
    };
    
    return (
      <div 
        key={`${position}-indicator`}
        className={`turn-indicator turn-indicator-${position} turn-${car.turn}`}
      >
        {getArrowSymbol(car.turn, position)}
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
        <div className="intersection-center">
          {/* Turn indicators positioned in the center */}
          {renderTurnIndicator(getCarByPosition(Position.LEFT), 'left')}
          {renderTurnIndicator(getCarByPosition(Position.RIGHT), 'right')}
          {renderTurnIndicator(getCarByPosition(Position.FRONT), 'front')}
          {renderTurnIndicator(getCarByPosition(Position.ME), 'me')}
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
