import React, { useState } from 'react';
import Car from './Car.jsx';

const TestPriorityOrder = ({ solution, onSuccess }) => {
    const task = solution.task;
    const [clickedOrder, setClickedOrder] = useState([]);
    const [checkOrderError, setCheckOrderError] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const onCarClick = (carColor) => {
        if (isCompleted || clickedOrder.includes(carColor)) return;
        
        const newOrder = [...clickedOrder, carColor];
        setClickedOrder(newOrder);
        
        // If all cars have been clicked, automatically check the order
        if (newOrder.length === task.cars.length) {
            checkOrder(newOrder);
        }
    };

    const reset = () => {
        setClickedOrder([]);
        setCheckOrderError(null);
        setIsCompleted(false);
    };

    const checkOrder = (orderToCheck = clickedOrder) => {
        const { sortedCars } = solution.getOrder();
        const correctOrder = sortedCars.map(car => car.color);
        
        const isCorrect = 
            orderToCheck.length === correctOrder.length &&
            orderToCheck.every((color, index) => color === correctOrder[index]);
        
        setCheckOrderError(isCorrect ? 'Правилно!' : `Грешка! Правилният ред е: ${correctOrder.join(', ')}`);
        setIsCompleted(true);
        
        if (isCorrect) {
            onSuccess();
        }
    };

    const getCarClickNumber = (carColor) => {
        const index = clickedOrder.indexOf(carColor);
        return index >= 0 ? index + 1 : null;
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Кликнете колите в реда, в който трябва да минат</h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                gap: '10px', 
                marginBottom: '20px' 
            }}>
                {task.cars.map((car) => {
                    const clickNumber = getCarClickNumber(car.color);
                    const isClicked = clickNumber !== null;
                    
                    return (
                        <div 
                            key={car.color} 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: isCompleted || isClicked ? 'default' : 'pointer',
                                opacity: isCompleted || isClicked ? 0.7 : 1,
                                position: 'relative'
                            }}
                            onClick={() => onCarClick(car.color)}
                        >
                            <Car car={car} />
                            {isClicked && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'white',
                                    border: '2px solid black',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                }}>
                                    {clickNumber}
                                </div>
                            )}
                            <div style={{ marginTop: '5px', textAlign: 'center' }}>
                                {car.color}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={reset}
                    style={{ 
                        marginRight: '10px',
                        padding: '10px 20px',
                        fontSize: '16px'
                    }}
                >
                    Нулиране
                </button>
                
                {clickedOrder.length === task.cars.length && !isCompleted && (
                    <button
                        onClick={() => checkOrder()}
                        style={{ 
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Проверка
                    </button>
                )}
                
                {checkOrderError && (
                    <div style={{ 
                        marginTop: '10px', 
                        padding: '10px',
                        backgroundColor: checkOrderError.includes('Правилно') ? '#d4edda' : '#f8d7da',
                        border: `1px solid ${checkOrderError.includes('Правилно') ? '#c3e6cb' : '#f5c6cb'}`,
                        borderRadius: '4px',
                        color: checkOrderError.includes('Правилно') ? '#155724' : '#721c24'
                    }}>
                        {checkOrderError}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPriorityOrder;
