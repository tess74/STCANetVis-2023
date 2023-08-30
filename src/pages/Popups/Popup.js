import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './popup.css';
// actions
import { deactivatePopup } from '../../redux/action/popupActions';
// components
import Login from './Login/Login';
import ErrorPop from './InfoNError/ErrorPop';
import UsLogin from './Login/UsLogin';
import OtpLogin from './Login/OtpLogin';
import PassConfirm from './Login/PassConfirm';
import LoadingPopUp from './LoadingPop/LoadingPopUp';

function Popup() { // this componet hold content of different popupTypes and decide which popup mode to display
    const PopupData = useSelector((state) => state.PopupReducer);
    const dispatch = useDispatch();
    let content = (<div>hello</div>);
    if (PopupData.mode === 'login') {
        content = (<Login />);
    } else if (PopupData.mode === 'us_login') {
        content = (<UsLogin />);
    } else if (PopupData.mode === 'otp_login') {
        content = (<OtpLogin />);
    } else if (PopupData.mode === 'pass_confirm') {
        content = (<PassConfirm dataSend={PopupData.data} />);
    } else if (PopupData.mode === 'error') {
        content = (
            <ErrorPop
                errorText={PopupData.data.text}
                infoState={false}
                HeadName={PopupData.data.head}
            />
        );
    } else if (PopupData.mode === 'info') {
        content = (
            <ErrorPop
                errorText={PopupData.data.text}
                infoState={true}
                HeadName={PopupData.data.head}
            />
        );
    } else if (PopupData.mode === 'loading') {
        content = (
            <LoadingPopUp
                text_info={PopupData.data.text}
            />
        );
    } 
    return (
        <div className="PopupCompMain">
            <div className="topSectionPopupComp">
                <button className="closePopupButtonPopupComp" onClick={() => dispatch(deactivatePopup())}>
                    <span className="material-symbols-rounded">
                        close
                    </span>
                </button>
            </div>
            <div className="PopupContHolder">
                {
                    content
                }
            </div>
        </div>
    );
}

export default Popup;
