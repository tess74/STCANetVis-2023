import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './networkPlotGre.css';
import { networkGrahGen } from '../../funs/networkGraphGen';

function NetworkPlotGra() {
    const DataChge =  useSelector((state) => state.DataSetReduc);
    useEffect(() => {
        if (typeof (DataChge.chatsData.netData) !== 'undefined') {
            networkGrahGen(DataChge.chatsData.netData);
        }
    }, [DataChge.changedChats, DataChge.chatsData.netData])
    // funCreateNetworkgraph();

    return (
        <div className="NetworkPlotGraMain">
            <h3 className="NetworkPlotGRaHeader">
                Scalability Visualization 
            </h3>
            <div className="PlotHolderNetworkPlotGra">
                {/* <div className='container'>
                    <div className='chartContainer'>
                    <svg className='chart'>
                    </svg>
                    </div>
                </div> */}
                <div className="tooltipNetwork"></div>
            </div>
        </div>
    );
}

export default NetworkPlotGra;
