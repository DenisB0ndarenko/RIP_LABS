import {getQuestsList} from "../actions/getQuestsList";
import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";

function questsListReducer(state = initialState.questsList, action) {
    switch (action.type) {
        case getQuestsList:
            return action.value
        default: return state
    }
}

export default questsListReducer()
export const questsListReducer_var = combineReducers(
    {
        questsList: questsListReducer
    }
);