import React from 'react';

const Signs = () => (
    <>
        <img className='sign traffic-sign-stop' />
        <img className='sign traffic-sign-give-way' />
        <img className='sign traffic-sign-right-of-way' />
    </>
)

const WaitSigns = () => (
    <>
        <img className='sign traffic-sign-stop' />
        <img className='sign traffic-sign-give-way' />
    </>
)

const GoSigns = () => (
    <>
        <img className='sign traffic-sign-right-of-way' />
    </>
);

const RulesModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Правила</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <ol>
                        <li>
                            <h4>Групирай по път с предимство</h4>
                            <div style={{ color: 'red' }}><b>Групата с предимство</b> минават преди всички от <b>групата без предимство</b>, независимо от дясностоящи или посоки на движение.</div>
                            <ol>
                                <li>Ако има <img className='sign direction-sign' />, групата с предимство са тези върху дебелата линия. Ролята на <Signs /> е спомагателна.</li>
                                <li>
                                    Ако имаш само <WaitSigns />, твоят път е <b className="red">без предимство</b>. Хоризонталните са с предимство. <br />
                                    Ако имаш само <GoSigns />, твоят път е <b className="green">с предимство</b>. Хоризонталните са без. <br />
                                </li>
                                <li><u>Няма знаци</u> - никой не е с предимство. (всички са втора група)</li>
                            </ol>
                        </li>
                        <li>
                            <h4>Дясностоящи</h4>
                            <div style={{ color: 'red' }}>Прилагаме <b>по групи</b> и само ако горният метод не е бил достатъчен. Посоките на движение отново <b>нямат значение</b>. </div>
                        </li>
                        <li>
                            <h4>Посоки на движение</h4>
                            <div style={{ color: 'red' }}>Прилагаме само ако горните два метода не са били достатъчни. Чак тук посоките на движение <b>имат значение</b>. </div>
                            При двама срещуположни от една група по предимство (и двамата са на път със или без предимство) - завиващият наляво пропуска другия.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RulesModal;
