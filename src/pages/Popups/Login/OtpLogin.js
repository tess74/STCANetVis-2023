import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.css';
//api calls function
import { sendToBackendPost } from '../../../funs/apiCall';
// redux functions
import { deactivatePopup } from '../../../redux/action/popupActions';
// static images
import logoCompny from '../../../images/logo.svg';
import TextInputBlock from '../../Micros/TextInputBlock';
// components
import Loadeffect from '../../Micros/Loadeffect';

function OtpLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [InputClassvals, setInputClassVal] = useState({ inputName: '', nameClass: '' });
    const [errorSubmit, setErrorSubmit] = useState('');
    const [formValues, setFormValues] = useState({ act: 'otp_login'});
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
                dispatch(deactivatePopup());
                navigate('/admin');
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
                <h2 className="LoginHeaderMainPopup">OTP Section</h2>
                <form className="LoginFormPopup" onSubmit={(e) => submitForm(e)}>
                    <TextInputBlock
                        InputName="code"
                        LabelName="Security Code"
                        placeHolder="six digit code"
                        Type="number"
                        InputStyleClass={InputClassvals.inputName === 'otp' ? InputClassvals.nameClass : ''}
                        defaultVal=""
                        ChangeFun={getvaluesForm}
                        is_Required={true}
                    />
                    <div className="resendButtonHolder">
                        <button className="resendOTpLogin">
                            Resend
                        </button>
                    </div>
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

export default OtpLogin;
