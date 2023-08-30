import { PlanConst } from "../constant/planConstants";

export const changeSelectedPlan = (planId) => (
    {
        type: PlanConst.CHANGE_SELECTED_PLAN,
        payload: planId,
    }
);

export const changePlanInit = (planId) => (
    {
        type: PlanConst.INIT_CHANGE_OF_PLAN,
        payload: planId,
    }
)