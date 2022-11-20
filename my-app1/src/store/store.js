import {configureStore} from "@reduxjs/toolkit";
import {getQuests} from "../myRequests";
import {actionCreator_getQuestsList} from "./actionCreators/getQuestsList"
import {actionCreator_setLoadingStatus} from "./actionCreators/setLoadingStatus"
import rootReducer from "./reducers/rootReducer";
import initialState from "./initialState";


export const fetchQuestsList = () => async dispatch => {
    await dispatch(actionCreator_setLoadingStatus(true))
    await getQuests().then(async data => {
        await dispatch(actionCreator_getQuestsList(data))
        await dispatch(actionCreator_setLoadingStatus(false))
    })
}

const store = configureStore({
        reducer: rootReducer,

        fetchQuestsList
}
);

export {store}