import React, { useState } from 'react';
import Car from './Car.jsx';

const TestPriorityWeak = ({ solution, onSuccess }) => {
    const task = solution.task;
    const [selectedCars, setSelectedCars] = useState(new Set());
    const [checkPriorityError, setCheckPriorityError] = useState(null);

    const onCarClick = (carId) => {
        const newSelectedCars = new Set(selectedCars);
        if (newSelectedCars.has(carId)) {
            newSelectedCars.delete(carId);
        } else {
            newSelectedCars.add(carId);
        }
        setSelectedCars(newSelectedCars);
    };

    const checkPriority = () => {
        const { priorityRoadCars } = solution.getOrder();
        const result =
            priorityRoadCars.every(car => selectedCars.has(car.color)) &&
            selectedCars.size === priorityRoadCars.length;
        setCheckPriorityError(result ? 'Правилно!' : 'Грешка: Неправилно избрани коли с предимство!');
        if (result) {
            onSuccess();
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Кои коли са на път с предимство?</h2>
            <div style={{ marginTop: '20px' }}>
                {task.cars.map((car) => {
                    return <div key={car.color} className='test-option'>
                        <input
                            type="checkbox"
                            id={`car-${car.color}`}
                            checked={selectedCars.has(car.color)}
                            onChange={() => onCarClick(car.color)}
                            style={{ marginRight: '10px' }}
                        />
                        <Car car={car} key={car.color} />
                    </div>
                })}
                <div className='test-option'>
                    <input
                        type="checkbox"
                        checked={selectedCars.size === 0}
                        onChange={() => setSelectedCars(new Set())}
                        style={{ marginRight: '10px' }}
                    />
                    Няма път с предимство
                </div>
                <button
                    onClick={checkPriority}
                >Проверка</button>
                <div>
                    {checkPriorityError}
                </div>
            </div>
        </div>
    );
};

export default TestPriorityWeak;
