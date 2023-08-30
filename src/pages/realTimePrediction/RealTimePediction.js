import React from 'react';
import './realTimePrediction.css';
// components
import PredictionPlot from './minorComponents/PredictionPlot';

function RealTimePediction() {
    return (
        <div className="RealTimePedictionMain">
            RealTime Prediction
            <div className="RealTimePredictionPlot">
                <PredictionPlot />
            </div>
        </div>
    );
}

export default RealTimePediction;