import { AdminConstant } from "../constant/adminConstant";

export const changeViewSection = (sectionId) => (
    {
        type: AdminConstant.CHANGE_SHOWING_SECTION,
        payload: sectionId,
    }
);

export const changeTypeOnView = (viewType) => (
    {
        type: AdminConstant.CHANGE_TYPE_ON_VIEW,
        payload: viewType,
    }
);

export const addAdminData = (adminData) => (
    {
        type: AdminConstant.ADD_ADMIN_DATA,
        payload: adminData,
    }
);

export const ChooseVehicles = (owner_id) => (
    {
        type: AdminConstant.ADD_VEHICLE_OWNER,
        payload: owner_id,
    }
)
