import { DataSetCOns } from "../constant/datasetsConst";

export const insertDatasetInfo = (datasets) =>(
    {
        type: DataSetCOns.ADD_OLDDATA_INFO,
        payload: datasets
    }
);

export const changeActiveDataset = (dataset) =>(
    {
        type: DataSetCOns.CHANGE_ACTIVE_DATASET,
        payload: dataset
    }
)

export const updateChatsData = (chatData) => (
    {
        type:DataSetCOns.UPDATE_CHATS_DATA,
        payload: chatData
    }
)