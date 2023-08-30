import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveDataset } from '../../../../redux/action/datasetsActs';
import './historyRuns.css';
import RowHistoryRun from './minor/RowHistoryRun';
import _ from 'lodash';
import { formatDate } from '../../../../funs/SharedFun';

function HistoryRuns() {
    const dispatch = useDispatch()
    let dispData = [];
    const Datasets = useSelector((state) => state.DataSetReduc.datasetsInfo);
    if (typeof (Datasets.state) !== 'undefined' && Datasets.state === 'success') {
        dispData = Datasets.data;
    }
    let runId = 0;
    return (
        <div className="HistoryRunsMain">
            <div className="HistoryRunsContHolder">
                <div className="HeaderSectHistoryRun">
                    <h3 className="HeadNameHistoryRun">
                        Performance Overview
                    </h3>
                </div>
                <div className="HistoryRunsContentTable">
                    <div className="HistoryRunsTableHeader">
                        <div className="IDColumnHistoryRunsTableHeader">
                            ID
                        </div>
                        <div className="TitleColumnHistoryRunsTableHeader">
                            Dataset Name
                        </div>
                        <div className="LastDateColumnHistoryRunsTableHeader">
                            Last Run
                        </div>
                        <div className="timeTakenColumnHistoryRunsTableHeader">
                            RMSE
                        </div>
                        <div className="timeTakenColumnHistoryRunsTableHeader">
                            MAE
                        </div>
                        <div className="timeTakenColumnHistoryRunsTableHeader">
                            R-Square
                        </div>
                        <div className="timeTakenColumnHistoryRunsTableHeader">
                            Epochs
                        </div>
                        <div className="timeTakenColumnHistoryRunsTableHeader timeTakenSpecialHistoryRuns">
                            Runtime
                        </div>
                    </div>
                    <div className="HistoryRunsTableContent">
                        {
                            _.isArray(dispData) && !_.isEmpty(dispData)
                            ?
                            dispData.map((dataval) => {
                                runId++
                                let vsl = {}
                                if (typeof (dataval.rundet) !== 'undefined' && dataval.rundet.state === 'success') {
                                    vsl = dataval.rundet.data
                                }
                                if (runId === 1) {
                                    dispatch(changeActiveDataset(dataval))
                                }
                                return (
                                    <RowHistoryRun 
                                        key={dataval.dataset.dataset_id}
                                        ID={runId} MAE={_.isEmpty(vsl) ? 0 : parseFloat(parseFloat(vsl.mae).toFixed(4))} 
                                        Epochs={_.isEmpty(vsl) ? 0 : parseFloat(parseFloat(vsl.mae).toFixed(4))} 
                                        RMSE={_.isEmpty(vsl) ? 0 : parseFloat(parseFloat(vsl.rmse).toFixed(4))} 
                                        R_square={_.isEmpty(vsl) ? 0 : parseFloat(parseFloat(vsl.r_square).toFixed(4))} 
                                        DateUploaded={formatDate(dataval.dataset.uploaded_date)} 
                                        datasetName={dataval.dataset.project_name}
                                        LastRun={_.isEmpty(vsl) ? '...' : formatDate(vsl.run_date)}
                                        TimeTaken={_.isEmpty(vsl) ? 0 : vsl.runtime} 
                                    />
                                );
                            })
                            :
                            (
                                <div style={{display: 'flex', width: '100%', height: '100%', alignContent: 'center', alignItems: 'center'}}>
                                    <h3>No Datasets found</h3>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryRuns;
