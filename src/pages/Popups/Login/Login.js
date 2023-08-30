import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.css';
// static images
import logoCompny from '../../../images/logo.svg';
import TextInputBlock from '../../Micros/TextInputBlock';
// api calls
import { sendToBackendPost } from '../../../funs/apiCall';
// redux function
import { deactivatePopup } from '../../../redux/action/popupActions';
// components
import Loadeffect from '../../Micros/Loadeffect';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [InputClassvals, setInputClassVal] = useState({ inputName: '', nameClass: '' });
    const [formValues, setFormValues] = useState({});
    const [errorLogs, setErrorLogs] = useState('');
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
        setErrorLogs('');
        setLoadingState(true);
        if (typeof (formValues.email) === 'undefined' || typeof (formValues.password) === 'undefined') {
            setErrorLogs('Email and passwords are required');
            setLoadingState(false);
            return false;
        }
        const data = {
            ...formValues,
            act: 'login',
        }
        const ansBck = await sendToBackendPost('/gatway/client.php', data);
        console.log(ansBck);
        setLoadingState(false);
        if (typeof (ansBck) !== 'object') {
            setErrorLogs('Unknow Error! Please try again.');
            return false;
        } else if (typeof (ansBck) === 'object' && ansBck.state !== 'success') {
            setErrorLogs(ansBck.data);
            return false;
        }
        dispatch(deactivatePopup());
        navigate('/admin');
    }
    return (
        <div className="loginMainPopup">
            <div className="loginPopupTopSect">
                <img src={logoCompny} className="logoLogin" alt="company logo" />
            </div>
            <div className="LoginContentHolder">
                <h2 className="LoginHeaderMainPopup">Admin Login</h2>
                <form className="LoginFormPopup" onSubmit={(e) => submitForm(e)}>
                    <TextInputBlock
                        InputName="email"
                        LabelName="Registered Email"
                        placeHolder="email used to registered"
                        Type="email"
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
                            errorLogs
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

export default Login;