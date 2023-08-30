import { SignupConstants } from "../constant/signupContants";

const initSignUpData = {
    planInfo: {},
    contactInfo: {},
    domainInfo: {},
    password: '',
    price: 0.0,
};

const signupReducer = (state = initSignUpData, { type, payload }) => {
    switch (type) {
    case SignupConstants.ADD_INIT_PLAN_INFO:
        return {
            ...state,
            planInfo: payload,
        };
    case SignupConstants.ADD_CONTANT_INFO:
        return {
            ...state,
            contactInfo: payload,
        };
    case SignupConstants.ADD_DOMAIN_INFO:
        return {
            ...state,
            domainInfo: payload,
        };
    case SignupConstants.ADD_LOGIN_PASSWORD:
        return {
            ...state,
            password: payload,
        };
    case SignupConstants.ADD_PRICE_INFO:
        return {
            ...state,
            price: payload,
        };
    default:
        return state;
    }
};

export default signupReducer;
