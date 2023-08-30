import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../../../../funs/SharedFun';
import './rowHistoryRun.css';



function RowHistoryRun({
    datasetName,
    DateUploaded,
    LastRun,
    RMSE,
    MAE,
    R_square,
    TimeTaken,
    ID,
    Epochs
}) {
    return (
        <div className="RowHistoryRun">
            <div className="RowHistoryRunContHolder">
                <div className="IconHolderDivRowHistRun inputBg">
                    {
                        ID
                    }
                </div>
                <div className="TitleColumnRowHistoryRun">
                    <div className="TitleNameRowHistoryRun">
                        {
                            datasetName
                        }
                    </div>
                    <div className="UploadedDateRowHistoryRun">
                        {
                            `Uploaded: ${DateUploaded}`
                        }
                    </div>
                </div>
                <div className="LastRunRowHistoryRun">
                    {
                        LastRun
                    }
                </div>
                <div className="runTimeRowHistoryRun">
                    {
                        RMSE
                    }
                </div>
                <div className="runTimeRowHistoryRun">
                    {
                        MAE
                    }
                </div>
                <div className="runTimeRowHistoryRun">
                    {
                        R_square
                    }
                </div>

                <div className="runTimeRowHistoryRun">
                    {
                        Epochs
                    }
                </div>
                <div className="runTimeRowHistoryRun runsNumRowHistRuns">
                    {
                        formatTime(TimeTaken)
                    }
                </div>
            </div>
        </div>
    );
}

RowHistoryRun.propTypes = {
    datasetName: PropTypes.string.isRequired,
    DateUploaded: PropTypes.string.isRequired,
    LastRun: PropTypes.string.isRequired,
    TimeTaken: PropTypes.number.isRequired,
    R_square: PropTypes.number.isRequired,
    MAE: PropTypes.number.isRequired,
    RMSE: PropTypes.number.isRequired,
    ID: PropTypes.number.isRequired,
    Epochs: PropTypes.number.isRequired,
};

export default RowHistoryRun;
