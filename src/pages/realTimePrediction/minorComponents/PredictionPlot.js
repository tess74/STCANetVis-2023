import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Slider } from '@mui/material';
import './predictionPlot.css';
import { generatePredictionGraph } from '../../../funs/predictionPlotGene';

function PredictionPlot() {
    const [dispval, setDispval] = useState(50);
    const [showHideKey, setShowHideKey] = useState(false);
    const [dispText, setDispText] = useState('STCANet');
    const DataChge =  useSelector((state) => state.DataSetReduc);
    useEffect(() =>{
        if (typeof (DataChge.chatsData.predData) !== 'undefined') {
            generatePredictionGraph(DataChge.chatsData.predData, DataChge.chatsData.len, dispval);
        }
    }, [dispval, DataChge.chatsData.predData, DataChge.chatsData.len])

    const marks = [
        {
          value: 0,
          label: '',
        },
        {
          value: 50,
          label: '',
        },
        {
          value: 100,
          label: '',
        },
      ];


    const ChangeGraphState = (em, val) =>{
        setDispval(val);
        if (val === 100) {
            setDispText('attention Chanel module');
            return 0;
        } else if (val === 0) {
            setDispText('spatial module');
            return 0;
        }
        setDispText('STCANet');
    }
    
    return (
        <div className="PredictionPlotMain">
            <div className="HeadingPredictionPlot">
                <h3 className="HeadNamePredictionPlot">
                    Prediction Visualization 
                </h3>
                <div className="ButtonsNSliderALL">
                    <div className="ControlsPredictions">
                        <Link to="/">
                            <button style={{marginRight: '10px', backgroundColor: 'transparent', border: '1px solid #61DAFB'}} className="ZoomControlsButtons" type="button">
                                <span className="material-symbols-rounded" style={{ color: '#000' }}>
                                    zoom_in_map
                                </span>
                            </button>
                        </Link>
                        <Link to="/predict">
                            <button className="ZoomControlsButtons" type="button">
                                <span className="material-symbols-rounded">
                                    zoom_out_map
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="PlotSurroundsPredictionPlot">
                <div className="HeatMapPlotSection">
                    <div style={{width: '100%', height: '100%'}}>
                         {/* don't delete */}
                    </div>
                </div>
                <div className="ScattedPlotSection">
                    {/* don't delete */}
                </div>
                {/* Keyes */}
                <div className="GraphInfoPredictChart" style={{display: 'none'}}>
                        This graph shows how two different modules are affected with increase of data size and number of iterations
                </div>
                <div className="OpenKeyButtonHolder">
                    <button onClick={() => setShowHideKey(true)} type="button" className="GraphKeyToggleButton">
                        <span className="material-symbols-outlined">
                            info
                        </span>
                    </button>
                    <div className="SliderHolderAll">
                        <div className="ValueSliderDisp">
                            {
                                dispText
                            }
                        </div>
                        <div className="SliderOnlyHolder">
                            <Slider
                                aria-label="Restricted values"
                                defaultValue={50}
                                step={null}
                                valueLabelDisplay="off"
                                marks={marks}
                                onChange={ChangeGraphState}
                            />
                        </div>
                    </div>
                </div>
                <div className="KeyHolderForShowAndHide" style={!showHideKey ? {display: 'none'} : {}}>
                    <div className="CloseButtonHolderNControls">
                        <button onClick={() => setShowHideKey(false)} type="button" className="GraphHideKey">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                    <div className="KeyNInfoNControls">
                        <div className="KeyPrediction">
                            <div className="KeyIconHolderAll" style={{display: 'none'}}>
                                <span className="material-symbols-outlined">
                                    info
                                </span>
                            </div>
                            <div className="keyRowInfPrediction">
                                <div className="ShapeHolderKeyPrediction">
                                    <div className="NShapeKeyPrediction"></div>
                                </div>
                                <div className="KeyShapeDiscrbePrediction">
                                    Predicted Values
                                </div>
                            </div>
                            <div className="keyRowInfPrediction">
                                <div className="ShapeHolderKeyPrediction">
                                    <div className="ShapeKeyPrediction" style={{backgroundColor: '#FF3535'}}></div>
                                </div>
                                <div className="KeyShapeDiscrbePrediction">
                                    Areas with many predicted values
                                </div>
                            </div>
                            <div className="keyRowInfPrediction">
                                <div className="ShapeHolderKeyPrediction">
                                    <div className="ShapeKeyPrediction" style={{backgroundColor: '#C89063'}}></div>
                                </div>
                                <div className="KeyShapeDiscrbePrediction">
                                    Areas with moderate predicted values
                                </div>
                            </div>
                            <div className="keyRowInfPrediction">
                                <div className="ShapeHolderKeyPrediction">
                                    <div className="ShapeKeyPrediction" style={{backgroundColor: '#010080'}}></div>
                                </div>
                                <div className="KeyShapeDiscrbePrediction">
                                    Areas with very few or no predicted values
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PredictionPlot;
