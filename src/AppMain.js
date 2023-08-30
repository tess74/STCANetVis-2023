import React,{ useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './appMain.css';
import { insertDatasetInfo } from './redux/action/datasetsActs';
import { activatePopup,deactivatePopup } from './redux/action/popupActions';
// components
import SideNav from './pages/navs/SideNav';
import TopNav from './pages/navs/TopNav';
import HistoryRuns from './pages/dashboard/DashComponents/History/HistoryRuns';
import Popup from './pages/Popups/Popup';
import { fetAllDet } from './funs/fetchAllData';

function AppMain() {
    const UniqueLoadId = useSelector((state) => state.ActiveSearchRed.uniqueCode)
    const dispatch = useDispatch();
    useEffect(()=>{
        const  Fet = async()=>{
            dispatch(activatePopup('loading', { text: 'loading data...' }));
            const rusl = await fetAllDet();
            dispatch(deactivatePopup());
            dispatch(insertDatasetInfo(rusl));
        }
        Fet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UniqueLoadId])
    const popupState = useSelector((state) => state.PopupReducer.state);

    return (
        <div className="AppMain ">
            <div className="AllAppHolder">
                <div className="SidePanelAppMain">
                    <div className="StagnatSectionSideNavAppMain">
                        <SideNav />
                    </div>
                </div>
                <div className="GraphsNtopNavAppMain">
                    <div className="TopNavAppMain">
                        <div className="TopNavSectionFixedPos">
                            <TopNav />
                        </div>
                    </div>
                    <div className="GraphsNContentSect">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="BottomPerformanceOverViewAppMain">
                <HistoryRuns />
            </div>
            <div className="PopUpHolderDiv" style={popupState? { display: 'flex' }: {}}>
                <Popup />
            </div>
        </div>
    );
}

export default AppMain;