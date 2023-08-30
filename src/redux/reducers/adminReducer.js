import { AdminConstant } from "../constant/adminConstant";

const initAdminstate = {
    showing_view: 'clients',
    showing_type: 'admin',
    data: {},
    active_owner: '',
};

const AdminReducer = (state = initAdminstate, { type, payload }) => {
    switch (type) {
    case AdminConstant.CHANGE_SHOWING_SECTION:
        return {
            ...state,
            active_owner: '',
            showing_view: payload,
        }

    case AdminConstant.CHANGE_TYPE_ON_VIEW:
        return {
            ...state,
            showing_type: payload,
        }

    case AdminConstant.ADD_ADMIN_DATA:
        return {
            ...state,
            data: payload,
            showing_type: payload.admin_type,
        }
    case AdminConstant.ADD_VEHICLE_OWNER:
        return {
            ...state,
            active_owner: payload,
        }
    
    default:
        return state;
    }
}

export default AdminReducer;
