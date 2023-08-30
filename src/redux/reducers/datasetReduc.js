import { DataSetCOns } from "../constant/datasetsConst";

const initAdminstate = {
    datasetsInfo: {},
    activeDataset: {},
    chatsData: {},
    changedChats: ''
};

const DataSetReduc = (state = initAdminstate, { type, payload }) => {
    switch (type) {
    case DataSetCOns.ADD_OLDDATA_INFO:
        return {
            ...state,
            datasetsInfo: payload
        }

    case DataSetCOns.CHANGE_ACTIVE_DATASET:
        return {
            ...state,
            activeDataset: payload,
        }
    

    case DataSetCOns.UPDATE_CHATS_DATA:
        return {
            ...state,
            chatsData: payload,
            changedChats: Math.random()
        }

    default:
        return state;
    }
}

export default DataSetReduc;
