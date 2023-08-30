import { offencesConst } from "../constant/offencesConstant";

export const addAllOffences = (offences) => (
    {
        type: offencesConst.ADD_ALL_OFFENCES_DATA,
        payload: offences,
    }
);

export const changeOnViewOffence = (offenceId) => (
    {
        type: offencesConst.CHANGE_ON_VIEW_OFFENCES,
        payload: offenceId,
    }
);