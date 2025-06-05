const Arrow = ({ turn }) => !turn ? null : <div className={`arrow arrow-${turn}`} />
export default Arrow;
