import {setLoadingStatus} from "../actions/setLoadingStatus";

export const actionCreator_setLoadingStatus = (val) => {
    return {
        type: setLoadingStatus,
        value: val
    }
}