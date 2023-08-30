import React from 'react';
import './predictPlotNControls.css';
// components
import PredictionPlot from '../../realTimePrediction/minorComponents/PredictionPlot';

function PredictPlotNControls(props) {
    return (
        <div className="PredictNControlsMain">
            <div className="PrectionPlotHolderPredNControl">
                <PredictionPlot />
            </div>
        </div>
    );
}

export default PredictPlotNControls;
