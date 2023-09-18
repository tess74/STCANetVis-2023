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
                <NetworkPlotGra />
            </div>
            <div className="DashContHolder">
                <div className="leftSectDash" >
                    <PredictPlotNControls />
                </div>
                <div className="RightSectDash">
                    <DataPlotNHistory  />
                </div>
            </div>
        </div>
    );
}

export default DashMainx;