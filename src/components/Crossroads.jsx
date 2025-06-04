import React from 'react';
import './Crossroads.css';
import { Position } from '../models/index.js';

const Crossroads = ({ task }) => {
  const myCar = task.getMyCar();
  
  const renderMyCar = () => {
    if (!myCar) return null;
    
    return (
      <div 
        className={`car car-${myCar.color}`}
        title={`My ${myCar.color} car going ${myCar.turn}`}
      >
        <div className="car-body"></div>
      </div>
    );
  };

  const renderMyTurnIndicator = () => {
    if (!myCar) return null;
    
    return (
      <div className={`turn-indicator turn-${myCar.turn}`}>
        {/* Arrow shape created with CSS pseudo-elements */}
      </div>
    );
  };

  return (
    <div className="crossroads-container">
      <div className="crossroads">
        {/* Horizontal road */}
        <div className="road horizontal-road"></div>
        
        {/* Vertical road */}
        <div className="road vertical-road">
          {/* My car (bottom) */}
          <div className="car-slot me-slot">
            {renderMyCar()}
          </div>
        </div>
        
        {/* Intersection center */}
        <div className="intersection-center">
          {renderMyTurnIndicator()}
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
