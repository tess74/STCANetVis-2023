import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './predictionPlot.css';
import { generatePredictionGraph } from '../../../funs/predictionPlotGene';

function PredictionPlot() {
    const DataChge =  useSelector((state) => state.DataSetReduc);
    useEffect(() =>{
        if (typeof (DataChge.chatsData.predData) !== 'undefined') {
            generatePredictionGraph(DataChge.chatsData.predData, DataChge.chatsData.len);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DataChge.changedChats, DataChge.chatsData.predData])

    
    
    return (
        <div className="PredictionPlotMain">
            <div className="HeadingPredictionPlot">
                <h3 className="HeadNamePredictionPlot">
                    Prediction Visualization 
                </h3>
            </div>
            <div className="PlotSurroundsPredictionPlot">
                <div className="HeatMapPlotSection">
                    <div style={{width: '100%', height: '100%'}}>
                        
                    </div>
                </div>
                <div className="ScattedPlotSection">
                    
                </div>
            </div>
        </div>
    );
}

export default PredictionPlot;
