import React, { useState } from 'react';
import userProfile from '../../images/theresia.jpeg';
import logo from '../../images/logo.svg';
import git from '../../images/github.svg';
import './topNav.css';
// import SlidingPanel from 'react-sliding-side-panel';
import ReactSlidingPane from 'react-sliding-pane';
import { Link } from 'react-router-dom';

function TopNav() {
    const [openPanel, setOpenPanel] = useState(false);
    const openCloseSideBar = () => {
        if(openPanel) {
            setOpenPanel(false);
        }else {
            setOpenPanel(true);
        }
    }

    const [activeSection, setActiveSection] = useState('home');
    return (
        <div className="topNavMain">
            <div className="topNavContantHolder">
                <div className="leftSectTopNav">
                    <div className="UserDetailsSectionsTopNav" style={{display: 'none'}}>
                        <img src={userProfile} alt="userProfile" className="userprofilePictTopNav" />
                        <div className="userTextDetailsHolder">
                            <div className="userNameTopNav">
                                Theresia F. Mwita
                            </div>
                            <div className="userTitleTopNav">
                                Project Manager
                            </div>
                        </div>
                    </div>
                    <div className="MenuButtnSecTopNav">
                        <button type="button" className="MenyeButtonTopNav" onClick={() => openCloseSideBar()}>
                            <span className="material-symbols-outlined">
                                {
                                    openPanel ? 'close' : 'apps'
                                }
                            </span>
                        </button>
                    </div>
                    <div className="ProjectNameNLogo">
                        <img src={logo} className="projectLogoSideNav" alt="Logo" />
                        <h2 className="ProjectName textColorNormal">STCANetViz</h2>
                    </div>
                </div>
                <div className="middleSectTopNav">
                    <div className="ModelNameDisplay" style={{display: 'none'}}>
                        <div className="ModelTitleDisp">
                            Model:
                        </div>
                        <div className="ModelNameDisp">
                            Sea Wave Prediction
                        </div>
                    </div>
                    <div className="calernderTopNav" style={{display: 'none'}}>
                        <div className="iconCalendertopNav">
                            Epochs:
                        </div>
                        <div className="DatevalueCalenderTopNav">
                            1840
                        </div>
                    </div>
                </div>
                <div className="rightSectTopNav">
                    <div className="actionsTopNav"> 
                        <div className="actionIconHolderTopNav lightGrayColor activeActionTopNav" style={{display: 'none'}}>
                            <span className="material-symbols-outlined">
                                settings_input_antenna
                            </span>
                        </div>
                        <div className="actionIconHolderTopNav lightGrayColor">
                            <img src={git} className="gitIconActionIcons" alt="github icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidePanelMain">
                <ReactSlidingPane
                    width="300px"
                    overlayClassName={`SlidePaneOverLay ${openPanel ? 'SlidePaneOverLayOn': ''}`}
                    className="SidePanaleMain"
                    from="left"
                    hideHeader={true}
                    isOpen={openPanel}
                    onRequestClose={() =>{
                        setOpenPanel(false);
                    }}
                >
                    <div className="slidePanelContentHolder">
                        <div className="NavigationButtons">
                            <Link to="/">
                                <button type="button" onClick={() => setActiveSection('home')} className={`SideNavigatorButtons ${activeSection === 'home' ? 'activeSideNav' : ''}`}>
                                    <div className="SideNavigatorButtonContHolder">
                                        <div className="IconHolderNavigotorButton">
                                            <span className="material-symbols-outlined">
                                                home_app_logo
                                            </span>
                                        </div>
                                        <div className="textHolderNaviButton">Home</div>
                                        <div className="arrowHolderActiveSideNavButton">
                                            <span className="material-symbols-outlined">
                                                arrow_forward_ios
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                            <Link to="/predict">
                                <button type="button" onClick={() => setActiveSection('predict')} className={`SideNavigatorButtons ${activeSection === 'predict' ? 'activeSideNav' : ''}`}>
                                    <div className="SideNavigatorButtonContHolder">
                                        <div className="IconHolderNavigotorButton">
                                            <span className="material-symbols-outlined">
                                                online_prediction
                                            </span>
                                        </div>
                                        <div className="textHolderNaviButton">Prediction View</div>
                                        <div className="arrowHolderActiveSideNavButton">
                                            <span className="material-symbols-outlined">
                                                arrow_forward_ios
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                            <Link to="/data_unce">
                                <button type="button" onClick={() => setActiveSection('data')} className={`SideNavigatorButtons ${activeSection === 'data' ? 'activeSideNav' : ''}`}>
                                    <div className="SideNavigatorButtonContHolder">
                                        <div className="IconHolderNavigotorButton">
                                            <span className="material-symbols-outlined">
                                                monitoring
                                            </span>
                                        </div>
                                        <div className="textHolderNaviButton">Data Uncertainty</div>
                                        <div className="arrowHolderActiveSideNavButton">
                                            <span className="material-symbols-outlined">
                                                arrow_forward_ios
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                            <Link to="/network">
                                <button type="button" onClick={() => setActiveSection('network')} className={`SideNavigatorButtons ${activeSection === 'network' ? 'activeSideNav' : ''}`}>
                                    <div className="SideNavigatorButtonContHolder">
                                        <div className="IconHolderNavigotorButton">
                                            <span className="material-symbols-outlined">
                                                hub
                                            </span>
                                        </div>
                                        <div className="textHolderNaviButton">Scalability Virtualisation</div>
                                        <div className="arrowHolderActiveSideNavButton">
                                            <span className="material-symbols-outlined">
                                                arrow_forward_ios
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </ReactSlidingPane>
            </div>
        </div>
    );
}

export default TopNav;