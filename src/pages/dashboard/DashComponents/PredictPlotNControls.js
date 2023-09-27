import React from 'react';
import './predictPlotNControls.css';
// components
import PredictionPlot from '../../realTimePrediction/minorComponents/PredictionPlot';

function PredictPlotNControls() {
    return (
        <div className="PredictNControlsMain">
            <div className="PrectionPlotHolderPredNControl">
                <PredictionPlot statx={'small'} />
            </div>
        </div>
    );
}

export default PredictPlotNControls;
