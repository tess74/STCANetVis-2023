import { CropConst } from "../constant/cropConstant";

export const addCroppedImge = (data) => (
    {
        type: CropConst.ADD_CROPPED_DATA,
        payload: data,
    }
);

export const clearCroppedImg = () => (
    {
        type: CropConst.CLEAR_CROPPED_IMAGE,
        payload: {},
    }
);