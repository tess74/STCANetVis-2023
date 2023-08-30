import { GenInfoConstant } from "../constant/genInfoConstant";

const initgenInfo = {
    addOn: {
        c_storage_low: {
            addon_price: 0.3
        },
        c_storage_high: {
            addon_price: 0.2
        },
        e_storage_low: {
            addon_price: 0.31
        },
        e_storage_medium: {
            addon_price: 0.27
        },
        e_storage_high: {
            addon_price: 0.18
        },
        e_storage_space: {
            addon_price: 0.34
        },
        user_mailer: {
            addon_price: 1
        },
        user_space: {
            addon_price: 1.5
        },
    },

    plans: {
        Enterprise: {
            max_e_storage: 10000,
            max_c_storage: 500000,
            max_users: 10000,
            min_e_storage: 500,
            min_c_storage: 1500,
            min_users: 100,
            price: 0,
            plan_id: 'enterprise',
            plan_name: 'Enterprise',
        },
        Custom: {
            max_e_storage: 10000,
            max_c_storage: 500000,
            max_users: 10000,
            min_e_storage: 5,
            min_c_storage: 0,
            min_users: 1,
            price: 1.54,
            plan_id: 'custom_plan',
            plan_name: 'Custom',
        },
        'Business Plus': {
            max_e_storage: 100,
            max_c_storage: 70000,
            max_users: 60,
            min_e_storage: 30,
            min_c_storage: 350,
            min_users: 30,
            price: 29,
            plan_id: 'business_plus',
            plan_name: 'Business Plus',
        },
        'Business Pro': {
            max_e_storage: 1000,
            max_c_storage: 150000,
            max_users: 100,
            min_e_storage: 100,
            min_c_storage: 700,
            min_users: 60,
            price: 117,
            plan_id: 'business_pro',
            plan_name: 'Business Pro',
        },
        Startup: {
            max_e_storage: 17,
            max_c_storage: 150,
            max_users: 15,
            min_e_storage: 10,
            min_c_storage: 50,
            min_users: 9,
            price: 11,
            plan_id: 'startup',
            plan_name: 'Startup',
        },

    }
}

const GenInfoReducer = (state = initgenInfo, { type, payload }) => {
    switch (type) {
    case GenInfoConstant.ADD_DATA_IN_GENINFO:
        return {
            ...state,
            addOn: payload.addon,
            plans: payload.plan,
        }

    default:
        return state
    }
}

export default GenInfoReducer;
