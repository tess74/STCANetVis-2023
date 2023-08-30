import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendToBackendPost } from '../../funs/apiCall';
import { getCurrentDateTime } from '../../funs/SharedFun';
import { reloadAllAdminData } from '../../redux/action/expo';
import { updateChatsData, changeActiveDataset } from '../../redux/action/datasetsActs';
import { socket } from '../../socket';
import './sideNav.css';

// actions
import { activatePopup } from '../../redux/action/popupActions';
import _ from 'lodash';

function SideNav() {
    const OpenFiles = () => {
        imgInpt.current?.click();
    }
    const [uploadCont, setUploadCont] = useState({dataset: null, project_name: '', passcode: 'theresia_is_on_wechat_07_24_08_2023'})
    const imgInpt = useRef(null);
    const activeData = useSelector((state) => state.DataSetReduc.activeDataset);
    const DatasetsArr = useSelector((state) => state.DataSetReduc.datasetsInfo);
    const dispatch = useDispatch();
    const formSubmitUpload = async (e)  =>{
        e.preventDefault();
        const formdata = new FormData();
        if (uploadCont.dataset === null || uploadCont.dataset === '' || uploadCont.project_name === '' || uploadCont.project_name.length < 5) {
            dispatch(activatePopup('error', { head: 'Error!', text: 'Make sure all data are set and Project name length is more than 5 characters' })); 
            return false;  
        }
        formdata.append('dataset', uploadCont.dataset);
        formdata.append('project_name', uploadCont.project_name);
        formdata.append('passcode', uploadCont.passcode);

        dispatch(activatePopup('loading', { text: 'loading data...' }));
        const ansbck = await sendToBackendPost('/dataupload', formdata);
        console.log(ansbck);
        if (typeof (ansbck) === 'object' && ansbck.state === 'success') {
            
            if (typeof (ansbck.data) === 'string') {
                dispatch(activatePopup('info', { head: 'Success', text: ansbck.data }));
            } else {
                dispatch(activatePopup('info', { head: 'Success', text: 'Datasets were successfully uploaded' }));
            }
            setTimeout(() => {
                dispatch(reloadAllAdminData(Math.random()));
            }, 3000);
        } else if (typeof (ansbck) === 'object' && ansbck.state !== 'success') {
            if (typeof (ansbck.data) === 'string') {
                dispatch(activatePopup('error', { head: ansbck.state, text: ansbck.data }));
            } else {
                dispatch(activatePopup('error', { head: ansbck.state, text: 'Something went wrong' }));
            }
        } else if (typeof (ansbck) ===  'string') {
            dispatch(activatePopup('error', { head: 'Error!', text: ansbck }));
        }else {
            dispatch(activatePopup('error', { head: 'Error!', text: 'failed to perform this action' }));
        } 
    }



    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [startEndTime, setStartEndTime] = useState({end: 'stopped', start: 'stopped'});
    const [activeNumDat, setActiveNumb] = useState(0);
    const [isrunning, setIsRunning] = useState(false);
    const [cureeInf, setCurrEInf] = useState({mae: 0, acc: 0, epoch: 0})
    let saveData = {
        ensemb: [],
        netData: [],
        predData: [],
        len: 200,
        mae: 0.0,
        acc: 0.0,
        epoch: 0
    }
    const playModelRun = async () => {
        saveData = {
            ensemb: [],
            netData: [],
            predData: [],
            len: 200,
            mae: 0.0,
            acc: 0.0,
            epoch: 0
        }
        if (isrunning) {
            setIsRunning(false);
            socket.disconnect();
            return 0;
        }
        if (!isConnected) {
            dispatch(activatePopup('error', { head: 'Connection Error!', text: 'For some reasons you are not connected' }));
            return false;
        }
        // check if there is any active dataset
        if (_.isEmpty(activeData)) {
            dispatch(activatePopup('error', { head: 'Error!', text: 'No active dataset, Please upload one or reload the page if you have done already' }));
            return false;
        }
        const playData = {
            passcode: 'theresia_is_on_wechat_07_24_08_2023',
            project_id: activeData.dataset.dataset_id
        }
        setIsRunning(true);
        console.log('connected');
        socket.emit('play_model', JSON.stringify(playData))
    }
    
    const sortDataAndSave = (data) => {
        
        if (typeof (data.state) !== 'undefined' && data.state === 'starting') {
            setStartEndTime({start: getCurrentDateTime(), end: 'running ....'})
            saveData = {
                ensemb: [],
                netData: [],
                predData: [],
                len: 200,
                mae: 0.0,
                acc: 0.0,
                epoch: 0
            }
            return false;
        }
        else if (typeof (data.state) !== 'undefined' && data.state === 'end') {
            setStartEndTime({...startEndTime,  end: getCurrentDateTime(),});
            return false;
        } else if (typeof (data.state) !== 'undefined' && data.state === 'error') {
            setStartEndTime({...startEndTime,  end: getCurrentDateTime(),});
            saveData = {
                ensemb: [],
                netData: [],
                predData: [],
                len: 200,
                mae: 0.0,
                acc: 0.0,
                epoch: 0
            }
            if (typeof (data.data) === 'string') {
                dispatch(activatePopup('error', { head: 'Error!', text: data.data }));
                return false;
            }
            dispatch(activatePopup('error', { head: 'Error!', text: 'Operation has failed' }));
        }
        // now work on the data
        saveData.ensemb.push(data.data.ensemble);
        if (_.isArray(data.data.netData)) {
            saveData.netData = [...saveData.netData, ...data.data.netData];
        }
        if (_.isArray(data.data.predictions)) {
            saveData.predData =[...saveData.predData,  ...data.data.predictions];
        }
        saveData.len = data.data.len;
        saveData.acc = data.data.acc;
        saveData.epoch = data.data.epoch;
        saveData.mae = data.data.mae;
        setCurrEInf({ mae: data.data.mae, epoch: data.data.epoch, acc: data.data.acc})
        dispatch(updateChatsData(saveData));

    }

    const changeActiveData = (path) =>{
        if (typeof (DatasetsArr) !== 'object' || _.isEmpty(DatasetsArr) || !_.isArray(DatasetsArr.data) || _.isEmpty(DatasetsArr.data)) {
            dispatch(activatePopup('info', { head: 'Info!', text: 'No datasets to scroll' }));
            return 0;
        }
        const len = DatasetsArr.data.length;
        if (path === 'forward') {
            if (activeNumDat >= (len - 1)) {
                dispatch(activatePopup('info', { head: 'Info!', text: 'You have reached the end of the list' }));
                return 0;
            }
            if (typeof (DatasetsArr.data[activeNumDat+1]) !== 'undefined') {
                setActiveNumb(activeNumDat+1);
                dispatch(changeActiveDataset(DatasetsArr.data[activeNumDat+1]));
                setIsBlinking(true)
                return 0;
            }
            dispatch(activatePopup('error', { head: 'Error!', text: 'Unknown error' }));
        } else {
            if (activeNumDat <= 0) {
                dispatch(activatePopup('info', { head: 'Info!', text: 'You have reached the end of the list' }));
                return 0;
            }
            if (typeof (DatasetsArr.data[activeNumDat-1]) !== 'undefined') {
                setActiveNumb(activeNumDat-1);
                setIsBlinking(true)
                dispatch(changeActiveDataset(DatasetsArr.data[activeNumDat-1]));
                return 0;
            }
            dispatch(activatePopup('error', { head: 'Error!', text: 'Unknown error -1' }));
        }
    }

    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setIsBlinking(false);
        }, 1000); // Set the timeout for one second
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, [isBlinking]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onPlayModel(value) {
            sortDataAndSave(JSON.parse(value))
            setFooEvents(previous => [...previous, value]);
            console.log(fooEvents);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('play_model', onPlayModel);

        return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('play_model', onPlayModel);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // lightGrayColor
        <div className="MainSideNav ">
            <div className="ContentHolderSideNav">
                <div className="ModelTrainSummarySideNav">
                    <h3 className="SummaryHeaderSideNav">
                        Optimization Overview
                    </h3>
                    <div className={`OptimatzationSummmaryContHolder ${isBlinking ? 'blue-background' : ''}` } style={{transition: 'background-color 0.3s ease'}}>
                        <div className="OptimazationSummaryHeader">
                            Parameter Settings
                        </div>
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                Framework:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                Sea wave predictor
                            </div>
                        </div>
                        {/* helloe spacer */}
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                Dataset Name:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                {
                                    !_.isEmpty(activeData)
                                    ? activeData.dataset.project_name
                                    : 'No uploaded data'
                                }
                            </div>
                        </div>
                        {/* helloe spacer */}
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                Start Time:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                {
                                    startEndTime.start
                                }
                            </div>
                        </div>
                        {/* helloe spacer */}
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                End Time:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                {
                                    startEndTime.end
                                }
                            </div>
                        </div>
                        {/* helloe spacer */}
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                Metric:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                Accuracy {cureeInf.acc }
                            </div>
                        </div>
                        {/* helloe spacer */}
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                MAE:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                {
                                    cureeInf.mae
                                }
                            </div>
                        </div>
                        {/* helloe spacer */}
                        <div className="OptimazationRowDivSideNav">
                            <div className="titleParameterOptSideNav">
                                Total iterations:
                            </div>
                            <div className="OptimazationValueSizeNav">
                                {
                                    cureeInf.epoch
                                }
                            </div>
                        </div>
                        {/* helloe spacer */}
                    </div>
                </div>
                <div className="searchSectionTopNav">
                    <div className="SearchDivHoldr">
                        <div className="iconHolderSerchTopNav">
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </div>
                        <form className="formSearchTopNav">
                            <input className="searchInputTopNav" name="search" placeholder="Search Dataset" />
                        </form>
                    </div>
                </div>
                <div className="controlsSectionSideNav">
                    <h4 className="PlayPauseHderSideNav">Run Controls</h4>
                    <div className="PlayPauseButtonGroupSideNav">
                        <button className="ForwardBackwardButtonsSideNav tooltipContHolder" onClick={() => changeActiveData('rewind')}>
                            <span className="material-symbols-rounded">
                                skip_previous
                            </span>
                            <span className="tooltiptext" >Go to the previous dataset</span>
                        </button>
                        <button className="PlayPauseButtonSideNav tooltipContHolder" onClick={()=> playModelRun()}>
                            <span className="material-symbols-rounded">
                                {
                                    isrunning ? 'stop' : 'play_arrow'
                                }
                                
                            </span>
                            <span className="tooltiptext" >Play to run model</span>
                        </button>
                        <button className="ForwardBackwardButtonsSideNav tooltipContHolder" onClick={() => changeActiveData('forward')}>
                            <span className="material-symbols-rounded">
                                skip_next
                            </span>
                            <span className="tooltiptext" >Go to the next dataset</span>
                        </button>
                    </div>
                </div>
                <div className="DatasetUploadSectHolderControls">
                    <div className="FormHeaderControls">
                        Upload Dataset
                    </div>
                    <form className="datasetUploadFormControls" onSubmit={(e) => formSubmitUpload(e)}>
                        <input style={{ display: 'none' }}  type="file" ref={imgInpt} name="image1" accept=".csv" onChange={(e) => setUploadCont({...uploadCont, dataset: e.target.files[0]})} />
                        <button type="button" className="AttachMentButtonControls tooltipContHolder" onClick={() => OpenFiles()}>
                            <span className="material-symbols-outlined">
                                attach_file
                            </span>
                            <span className="tooltiptext" >Select Dataset</span>
                        </button>
                        <input type="text" className="ProjectNameInputControls lightGrayColor" placeholder="Dataset Name" onChange={(ec => setUploadCont({...uploadCont, project_name: ec.target.value}))} />
                        <button type="submit" className="SubmitButtonProjectDetails tooltipContHolder">
                            <span className="material-symbols-outlined">
                                send
                            </span>
                            <span className="tooltiptext" >Upload datasets</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SideNav;