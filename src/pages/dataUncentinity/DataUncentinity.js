import React from 'react';
import './dataUncentinity.css';

// components
import DataUncentinityPlot from './moniorComponents/DataUncentinityPlot';

function DataUncentinity(props) {
    return (
        <div className="DataUncentinityMain">
            Data Uncentinity
            <div className="PlotHolderDataUncentinity">
                <DataUncentinityPlot />
            </div>
        </div>
    );
}

export default DataUncentinity;