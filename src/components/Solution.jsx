import React from 'react';
import { TrafficSign } from '../models/index.js';

const Car = ({ car }) => {
    if (!car) return null;
    return (
        <div
            className='car'
            style={{ backgroundColor: car.color }}
        />
    );
}

const Solution = ({ task, priorityRoadCars, nonPriorityRoadCars }) => {
    return (
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
                    <div className='explanation-text'>
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
                    <div className='explanation-text'>
                        {car.reason && <div style={{ marginLeft: 10 }}>{car.reason}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Solution;
