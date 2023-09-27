import React from 'react';
import './dashMain.css';
// components
import PredictPlotNControls from '../DashComponents/PredictPlotNControls';
import DataPlotNHistory from '../DashComponents/DataPlotNHistory';
import NetworkPlotGra from '../../NetworkPlor/NetworkPlotGra';

function DashMainx() {
    return (
        <div className="DashMain">
            <div className="NewtworkGraphContHolder">
                <PredictPlotNControls />
            </div>
            <div className="DashContHolder">
                <div className="leftSectDash" >
                    <DataPlotNHistory  />
                </div>
                <div className="RightSectDash">
                    <NetworkPlotGra statx={'small'} />
                </div>
            </div>
        </div>
    );
}

export default DashMainx;