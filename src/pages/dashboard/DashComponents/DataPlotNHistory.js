import React from 'react';
import './dataPlotNHistory.css';
// components
import DataUncentinityPlot from '../../dataUncentinity/moniorComponents/DataUncentinityPlot';

function DataPlotNHistory() {
    return (
        <div className="DataPlotNHistoryMain">
            <div className="DataPlotDTHist">
                <DataUncentinityPlot />
            </div>
        </div>
    );
}

export default DataPlotNHistory;
