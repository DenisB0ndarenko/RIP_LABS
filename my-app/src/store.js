import { configureStore } from "@reduxjs/toolkit";
import {getBookings, getQuestPricing, getQuests, getQuestsFiltered} from './myRequests'

// actions

const setLoadingStatus = "setLoadingStatus"
const getQuestsList = "getQuestsList"
const getBookingsList = "getBookingsList"
const setDateValue = "setDateValue"
const setQuestPricing = "setQuestPricing"
const setSliderValue = "setSliderValue"
const setTextFieldValue = "setTextFieldValue"



// actionCreators



const actionCreator_getQuestsList = (list) => {
    return {
        type: getQuestsList,
        value: list
    }
}

const actionCreator_getBookingsList = (list) => {
    return {
        type: getBookingsList,
        value: list
    }
}

const actionCreator_setLoadingStatus = (val) => {
    return {
        type: setLoadingStatus,
        value: val
    }
}

const actionCreator_setDateValue = (val) => {
    return {
        type: setDateValue,
        value: val
    }
}

export const createAction_setQuestPricing = (value) => {
    return {
        type: setQuestPricing,
        value: value
    }
}

export const createAction_setSliderValue = (value) => {
    return {
        type: setSliderValue,
        value: value
    }
}

export const createAction_setTextFieldValue = (value) => {
    return {
        type: setTextFieldValue,
        value: value
    }
}



// reducers



function questsListReducer(state = [], action) {
    switch (action.type) {
        case getQuestsList:
            return action.value
        default: return state
    }
}

function bookingsListReducer(state = [], action) {
    switch (action.type) {
        case getBookingsList:
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

function dateValueReducer(state = true, action) {
    switch (action.type) {
        case setDateValue:
            return action.value
        default: return state
    }
}

function textFieldValueReducer(state = '', action) {
    switch (action.type) {
        case setTextFieldValue:
            return action.value
        default: return state
    }
}

function sliderValueReducer(state = [0, 0], action) {
    switch (action.type) {
        case setSliderValue:
            return action.value
        default: return state
    }
}

function questPricingReducer(state = [0, 0], action) {
    switch (action.type) {
        case setQuestPricing:
            return action.value
        default: return state
    }
}

// const fetchQuestsList = () => async dispatch => {
//     dispatch(actionCreator_setLoadingStatus(true))
//     getQuests().then(data => {
//         dispatch(actionCreator_getQuestsList(data))
//         dispatch(actionCreator_setLoadingStatus(false))
//     })
// }


const fetchQuestsList = (filters) => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    if (filters) {
        const data = await getQuestsFiltered(filters.title, filters.max_cost, filters.min_cost)
        dispatch(actionCreator_getQuestsList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    }
    else {
        const data = await getQuests()
        dispatch(actionCreator_getQuestsList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    }
}

const fetchBookingsList = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getBookings().then(data => {
        dispatch(actionCreator_getBookingsList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}


const fetchAllQuestsPageData = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    const data = await getQuestPricing()
    const pricingInfo = [data.min_price || 0, data.max_price || 0]
    dispatch(createAction_setQuestPricing(pricingInfo))
    dispatch(actionCreator_setLoadingStatus(false))
}

// const putBookingOfList = (newBooking) => async dispatch => {
//     dispatch(actionCreator_setLoadingStatus(true))
//     putBooking(newBooking).then(newBooking=>{
//         dispatch(actionCreator_setLoadingStatus(false))
//     })
// }

const myMiddlewares=[
    fetchQuestsList(),
    fetchBookingsList(),
    //putBookingOfList()
]

const store = configureStore({
    reducer: {
        questsList: questsListReducer,
        dateValue: dateValueReducer,
        bookingsList: bookingsListReducer,
        loadingStatus: loadingStatusReducer,
        textFieldValue: textFieldValueReducer,
        questPricing: questPricingReducer,
        sliderValue: sliderValueReducer
    },
    myMiddlewares
})

export {
    actionCreator_setDateValue,
    fetchQuestsList,
    fetchBookingsList,
    fetchAllQuestsPageData,
    //putBookingOfList,
    store
}