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
                                <li>Ако има <img src='/direction-sign-se.png' />, групата с предимство са тези върху дебелата линия. Ролята на <Signs /> е спомагателна.</li>
                                <li>
                                    Ако имаш само <WaitSigns />, твоят път е без предимство. Хоризонталните са с предимство. <br />
                                    Ако имаш само <GoSigns />, твоят път е с предимство. Хоризонталните са без. <br />
                                </li>
                                <li><u>Няма знаци</u> - никой не е с предимство.</li>
                            </ol>
                        </li>
                        <li>
                            <h4>Дясностоящи</h4>
                            За всяка от групите приложи правилото на дясно стоящия.
                        </li>
                        <li>Ако правилото на десния е неприложимо (двама насрещни, от еднаква група), провери дали някой прави ляв завой - тогава той чака.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RulesModal;
