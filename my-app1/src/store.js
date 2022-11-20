import { configureStore } from "@reduxjs/toolkit";
import { getQuests } from './myRequests'

const setLoadingStatus = "setLoadingStatus"
const getQuestsList = "getQuestsList"

const actionCreator_getQuestsList = (list) => {
    return {
        type: getQuestsList,
        value: list
    }
}

const actionCreator_setLoadingStatus = (val) => {
    return {
        type: setLoadingStatus,
        value: val
    }
}

function questsListReducer(state = [], action) {
    switch (action.type) {
        case getQuestsList:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state = true, action) {
    switch (action.type) {
        case setLoadingStatus:
            return action.value
        default: return state
    }
}

const fetchQuestsList = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getQuests().then(data => {
        dispatch(actionCreator_getQuestsList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}

const store = configureStore({
    reducer: {
        questsList: questsListReducer,
        loadingStatus: loadingStatusReducer
    },
    fetchQuestsList
})

export {
    fetchQuestsList,
    store
}