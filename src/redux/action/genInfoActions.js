import { GenInfoConstant } from "../constant/genInfoConstant"

export const addDataGeninfo = (data) => (
    {
        type: GenInfoConstant.ADD_DATA_IN_GENINFO,
        payload: data,
    }
);