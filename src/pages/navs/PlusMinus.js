import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './plusMinus.css';

function PlusMinus({low, high, changeFun, name, variable}) {
    const [currntVal, setCurrntVal] = useState(low);
    const changeVlOnClick = (dir) => {
        if ((currntVal === low && dir === 'low') || (currntVal === high && dir === 'high')) {
            return 0
        }
        if (dir === 'low') {
            setCurrntVal(currntVal - 1);
            changeFun(currntVal - 1);
        } else {
            setCurrntVal(currntVal + 1);
            changeFun(currntVal + 1, variable);
        }
    }

    return (
        <div className="PlusMinusMain">
            <div className="NameRowValPlusMinus">
                {
                    name
                }
            </div>
            <div className="ValueChangePlusMinus">
                {
                    currntVal
                }
            </div>
            <div className="ChangerSecPlusMinus">
                <button className="PlusMinusButtn" onMouseDown={() => changeVlOnClick('low')} style={{marginRight: '5px'}} type="button">
                    <span className="material-symbols-rounded">
                        remove
                    </span>
                </button>
                <button className="PlusMinusButtn" type="button" onMouseDown={() => changeVlOnClick('high')} onClick={() => changeVlOnClick('high')}>
                    <span className="material-symbols-rounded">
                        add
                    </span>
                </button>
            </div>
        </div>
    );
}

PlusMinus.propTypes = {
    low: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired,
    changeFun: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
};

export default PlusMinus;
