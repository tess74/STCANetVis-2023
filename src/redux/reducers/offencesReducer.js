import { offencesConst } from "../constant/offencesConstant";

const initOffences = {
    activeOffence: '',
    offences: {},
};

const OffenceReducer = (state = initOffences, { type, payload }) => {
    switch (type) {
    case offencesConst.ADD_ALL_OFFENCES_DATA:
        return {
            ...state,
            offences: payload,
        }
    case offencesConst.CHANGE_ON_VIEW_OFFENCES:
        return {
            ...state,
            activeOffence: payload,
        }

    default:
        return state;
    }
};

export default OffenceReducer;
