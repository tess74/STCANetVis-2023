import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './login.css';
// actions
import { activatePopup } from '../../../redux/action/popupActions';
// static images
import logoCompny from '../../../images/logo.svg';
import TextInputBlock from '../../Micros/TextInputBlock';
// api call functions
import { sendToBackendPost } from '../../../funs/apiCall';
// components
import Loadeffect from '../../Micros/Loadeffect';

function UsLogin() {
    const dispatch = useDispatch();
    const [InputClassvals, setInputClassVal] = useState({ inputName: '', nameClass: '' });
    const [errorSubmit, setErrorSubmit] = useState('');
    const [formValues, setFormValues] = useState({ act: 'login' });
    const [loadingState, setLoadingState] = useState(false);
    const getvaluesForm = (Inputname, value) => {
        const tempFormVal = formValues;
        // check if it the check value
        if (typeof (value) === 'boolean') {
            if(value) {
                tempFormVal[Inputname] = 'yes';
            } else {
                delete tempFormVal[Inputname];
            }
        } else {
            tempFormVal[Inputname] = value;
        }
        setFormValues({
            ...tempFormVal,
        });

        setInputClassVal({ inputName: Inputname, nameClass: 'errorInput' }); // remember to remove this
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setErrorSubmit('');
        setLoadingState(true);
        const ans = await sendToBackendPost('/gatway/us.php', formValues);
        setLoadingState(false);
        if (typeof (ans) === 'object') {
            if (ans['state'] !== 'success') {
                setErrorSubmit(ans['data']);
            } else {
                dispatch(activatePopup('otp_login', {}));
            }
        } else {
            setErrorSubmit('Error. Refresh the page and try again');
        }
    }
    return (
        <div className="loginMainPopup">
            <div className="loginPopupTopSect">
                <img src={logoCompny} className="logoLogin" alt="company logo" />
            </div>
            <div className="LoginContentHolder">
                <h2 className="LoginHeaderMainPopup">Login</h2>
                <form className="LoginFormPopup" onSubmit={(e) => submitForm(e)}>
                    <TextInputBlock
                        InputName="email"
                        LabelName="User Email"
                        placeHolder="e.g. inn.irro@dms.co.tz"
                        Type="text"
                        InputStyleClass={InputClassvals.inputName === 'email' ? InputClassvals.nameClass : ''}
                        defaultVal=""
                        ChangeFun={getvaluesForm}
                        is_Required={true}
                    />
                    <TextInputBlock
                        InputName="password"
                        LabelName="Password"
                        placeHolder="password"
                        Type="password"
                        InputStyleClass={InputClassvals.inputName === 'password' ? InputClassvals.nameClass : ''}
                        defaultVal=""
                        ChangeFun={getvaluesForm}
                        is_Required={true}
                    />
                    <div className="errorDivFormHolder">
                        {
                            errorSubmit
                        }
                    </div>
                    <div className="buttonHolderLogin" style={loadingState ? { display : 'none' } : {}}>
                        <button type="submit" className="loginButtonPopup">Login</button>
                    </div>
                    <div className="loadingDiv" style={loadingState ? {} : { display : 'none' }}>
                        <Loadeffect />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UsLogin;
