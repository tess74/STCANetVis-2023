import { sendToBackendPost } from "./apiCall"

export const fetAllDet = async ()=>{
    const info = await sendToBackendPost('/getinfo');
    return info;
}