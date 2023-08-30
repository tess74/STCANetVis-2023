import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stickGeneRator } from '../../../funs/candleStickGene';
import './dataUncentinityPlot.css';
import { transformData } from '../../../funs/SharedFun';

function DataUncentinityPlot() {
    const DataChge =  useSelector((state) => state.DataSetReduc);
    useEffect(() =>{
        if (typeof (DataChge.chatsData.ensemb) !== 'undefined') {
            stickGeneRator('PlotSurroundingsDataUncentinityMain', transformData(DataChge.chatsData.ensemb));
        }
    }, [DataChge.changedChats, DataChge.chatsData.ensemb])
    return (
        <div className="DataUncentinityPlotMain">
            <div className="PlotHeaderDataUncentinity">
                <h3 className="HeadNameDataUncentinity">
                    Uncertainty of Ensemble Data Visualization
                </h3>
            </div>
            <div className="PlotSurroundingsDataUncentinityMain">
                
            </div>
        </div>
    );
}

export default DataUncentinityPlot;