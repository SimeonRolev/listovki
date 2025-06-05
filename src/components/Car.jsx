const Car = ({ car }) => {
    if (!car) return null;
    return (
        <div
            className='car'
            style={{ backgroundColor: car.color }}
        />
    );
}

export default Car;
