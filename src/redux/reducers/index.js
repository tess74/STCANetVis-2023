import { combineReducers } from 'redux';
import ActiveSearchRed from './expo';
import PopupReducer from './popupReducer';
import PlanReducer from './planReducer';
import signupReducer from './signupReducer';
import AdminReducer from './adminReducer';
import GenInfoReducer from './genInfoReducer';
import OffenceReducer from './offencesReducer';
import CropReducer from './cropReducer';
import DataSetReduc from './datasetReduc';

const allreducers = combineReducers({
    ActiveSearchRed,
    PopupReducer,
    PlanReducer,
    signupReducer,
    AdminReducer,
    GenInfoReducer,
    OffenceReducer,
    CropReducer,
    DataSetReduc,
});

export default allreducers;
