import { PlanConst } from "../constant/planConstants";

const initPlanState = {
    selectedPlan: 'business_plus',
    changed: false, // this will let know if it is the user who actually pressed the button and selected plan
};

const PlanReducer = (state = initPlanState, { type, payload }) => {
    switch (type) {
    case PlanConst.CHANGE_SELECTED_PLAN:
        return {
            ...PlanConst,
            selectedPlan: payload,
            changed: true,
        }

    case PlanConst.INIT_CHANGE_OF_PLAN:
        return {
            ...PlanConst,
            selectedPlan: payload,
        }

    default:
        return state;
    }
}

export default PlanReducer;
