import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './networkPlotGre.css';
import { networkGrahGen } from '../../funs/networkGraphGen';

function NetworkPlotGra() {
    const [showHideKey, setShowHideKey] = useState(false);
    const DataChge =  useSelector((state) => state.DataSetReduc);
    useEffect(() => {
        if (typeof (DataChge.chatsData.netData) !== 'undefined') {
            networkGrahGen(DataChge.chatsData.netData);
        }
    }, [DataChge.chatsData.netData])

    return (
        <div className="NetworkPlotGraMain">
            <h3 className="NetworkPlotGRaHeader">
                Scalability Visualization 
            </h3>
            <div className="KeySectionHolderWithPosAb">
                <button onClick={() => setShowHideKey(true)} type="button" className="GraphKeyToggleButtonNetGraph">
                    <span className="material-symbols-outlined">
                        info
                    </span>
                </button>
                <div className="KeyNetworgraph" style={showHideKey ? {display: 'block'} : {}}>
                    <div className="KeyIconHolderAll" style={{paddingLeft: '9px'}}>
                        <button onClick={() => setShowHideKey(false)} type="button" className="GraphHideKeyNetGraph">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                    <div className="NRowNetworkGraphKey">
                        <div className="ShapeHolderKeyNetwork">
                            <div className="ShapeKeyNetwork" style={{ backgroundColor: '#ff3636', borderRadius: '3px' }}></div>
                        </div>
                        <div className="KeyDiscrbNetwork">
                            R_square below 0.55
                        </div>
                    </div>
                    <div className="NRowNetworkGraphKey">
                        <div className="ShapeHolderKeyNetwork">
                            <div className="ShapeKeyNetwork" style={{ backgroundColor: '#61DAFB', borderRadius: '3px' }}></div>
                        </div>
                        <div className="KeyDiscrbNetwork">
                            R_square above 0.75
                        </div>
                    </div>
                    <div className="NRowNetworkGraphKey">
                        <div className="ShapeHolderKeyNetwork">
                            <div className="ShapeKeyNetwork" style={{ backgroundColor: 'orange', borderRadius: '3px' }}></div>
                        </div>
                        <div className="KeyDiscrbNetwork">
                            R_square above 0.55, but below 0.75
                        </div>
                    </div>
                    <div className="SizeKeySectionNetwork">
                        <div className="rowNetworkGraph">
                            <div className="ShapeHolderKeyNetwork">
                                <div className="ShapeKeyNetwork" style={{ border: '1px solid #3D2B1F', width: '14px', height: '14px' }}></div>
                            </div>
                            <div className="KeyDiscrbNetwork">
                                Runtime below 3s
                            </div>
                        </div>
                        <div className="rowNetworkGraph">
                            <div className="ShapeHolderKeyNetwork">
                                <div className="ShapeKeyNetwork" style={{ border: '1px solid #3D2B1F', width: '24px', height: '24px' }}></div>
                            </div>
                            <div className="KeyDiscrbNetwork">
                                Runtime above 3s, but below 5s
                            </div>
                        </div>
                        <div className="rowNetworkGraph">
                            <div className="ShapeHolderKeyNetwork">
                                <div className="ShapeKeyNetwork" style={{ border: '1px solid #3D2B1F', width: '30px', height: '30px' }}></div>
                            </div>
                            <div className="KeyDiscrbNetwork">
                                Runtime above 5s
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="PlotHolderNetworkPlotGra">
                <div className="tooltipNetwork"></div>
            </div>
        </div>
    );
}

export default NetworkPlotGra;
