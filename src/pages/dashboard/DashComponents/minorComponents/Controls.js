import React from 'react';
import './controls.css';

function Controls() {
    return (
        <div className="controlsMain">
            <div className="IntroHederControls">
                <h3 className="ControlsNameHead">Controls</h3>
            </div>
            <div className="PlayPauseControlsHolder">
                <div className="PlayForwardBackComplexStructure inputBg">
                    <div className="StructureDividerControls" />
                    <div className="posForwadBackControls">
                        <div className="flextForwardVBackControls">
                            <button className="ForwardBackButtonControls BackButtonControls">
                                <span className="material-symbols-outlined">
                                    arrow_left
                                </span>
                            </button>
                            <button className="ForwardBackButtonControls">
                                <span className="material-symbols-outlined">
                                    arrow_right
                                </span>
                            </button>
                            <div className="CentreCoverCntrols">
                                <button className="PlayPauseButtonControls">
                                    <div className="PlayPauseContHolderControls">
                                        <div className="ButtonStateNamePlayPauseControls">Running</div>
                                        <div className="iconHolderButtonStatePlayPauseControls">
                                            <span className="material-symbols-outlined">
                                                sprint
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="trackPlayingDatasetControls">
                <div className="centredPlayingDatasetControls inputBg">
                    <div className="iconholderTrackDatasetControls">
                        <span className="material-symbols-outlined">
                            dataset_linked
                        </span>
                    </div>
                    <div className="TrackDatsectPlayingControls">
                        Indian Ocean Datasets Year 2023
                    </div>
                </div>
            </div>
            <div className="DatasetUploadSectHolderControls">
                <div className="FormHeaderControls">
                    Upload Dataset
                </div>
                <form className="datasetUploadFormControls">
                    <button type="button" className="AttachMentButtonControls">
                        <span className="material-symbols-outlined">
                            attach_file
                        </span>
                    </button>
                    <input type="text" className="ProjectNameInputControls lightGrayColor" placeholder="Dataset Name" />
                    <button className="SubmitButtonProjectDetails">
                        <span className="material-symbols-outlined">
                            send
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Controls;
