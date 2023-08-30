import { CropConst } from "../constant/cropConstant";

const initCrop = {
    croppedData: '',
    uploadedImg: '',
};

const CropReducer = (state = initCrop, {type, payload}) => {
    switch (type) {
    case CropConst.ADD_CROPPED_DATA:
        return {
            ...state,
            croppedData: payload,
        }

    case CropConst.CLEAR_CROPPED_IMAGE:
        return {
            ...state,
            croppedData: '',
        }

    default:
        return state;
    }
}

export default CropReducer;
