import {setLoadingStatus} from "../actions/setLoadingStatus";
import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";

function loadingStatusReducer(state = initialState.loadingStatus, action) {
    switch (action.type) {
        case setLoadingStatus:
            return action.value
        default: return state
    }
}

export default loadingStatusReducer()
export const loadingStatusReducer_var = combineReducers(
    {
        loadingStatus: loadingStatusReducer
    }
);