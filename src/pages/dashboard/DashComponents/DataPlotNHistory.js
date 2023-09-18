import React from 'react';
import './dataPlotNHistory.css';
// components
import DataUncentinityPlot from '../../dataUncentinity/moniorComponents/DataUncentinityPlot';

function DataPlotNHistory() {
    return (
        <div className="DataPlotNHistoryMain">
            <div className="DataPlotDTHist">
                <DataUncentinityPlot statx={'small'} />
            </div>
        </div>
    );
}

export default DataPlotNHistory;
