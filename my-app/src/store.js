import { configureStore } from "@reduxjs/toolkit";
import {
    getAllBookings,
    getBookings,
    getGenres,
    getOrganizers,
    getQuestPricing,
    getQuests,
    getQuestsFiltered,
    getQuestsma, getStatuses
} from './myRequests'

// actions

const setLoadingStatus = "setLoadingStatus"
const getQuestsList = "getQuestsList"
const getGenresList = "getGenresList"
const getOrganizersList = "getOrganizersList"
const getBookingsList = "getBookingsList"
const getStatusList = "getStatusList"
const setDateValue = "setDateValue"
const setQuestPricing = "setQuestPricing"
const setSliderValue = "setSliderValue"
const setTextFieldValue = "setTextFieldValue"
const setIsManager = "setIsManager"
const setPickedStatus = "setPickedStatus"
const setPickedStart = "setPickedStart"
const setPickedEnd = "setPickedEnd"



// actionCreators



const actionCreator_getQuestsList = (list) => {
    return {
        type: getQuestsList,
        value: list
    }
}

const actionCreator_getGenresList = (list) => {
    return {
        type: getGenresList,
        value: list
    }
}

const actionCreator_getOrganizersList = (list) => {
    return {
        type: getOrganizersList,
        value: list
    }
}

const actionCreator_getBookingsList = (list) => {
    return {
        type: getBookingsList,
        value: list
    }
}

const actionCreator_getStatusList = (list) => {
    return {
        type: getStatusList,
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



export const createAction_setIsManager = (value) => {
    return {
        type: setIsManager,
        value: value
    }
}


export const createAction_setPickedStatus = (value) => {
    return {
        type: setPickedStatus,
        value: value
    }
}

export const createAction_setPickedStart = (value) => {
    return {
        type: setPickedStart,
        value: value
    }
}

export const createAction_setPickedEnd = (value) => {
    return {
        type: setPickedEnd,
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

function genresListReducer(state = [], action) {
    switch (action.type) {
        case getGenresList:
            return action.value
        default: return state
    }
}

function organizersListReducer(state = [], action) {
    switch (action.type) {
        case getOrganizersList:
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

function statusListReducer(state = [], action) {
    switch (action.type) {
        case getStatusList:
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

function isManagerReducer(state = false, action) {
    switch (action.type) {
        case setIsManager:
            return action.value
        default: return state
    }
}

function pickedStatusReducer(state = 0, action) {
    switch (action.type) {
        case setPickedStatus:
            return action.value
        default: return state
    }
}

function pickedStartReducer(state = null, action) {
    switch (action.type) {
        case setPickedStart:
            return action.value
        default: return state
    }
}

function pickedEndReducer(state = null, action) {
    switch (action.type) {
        case setPickedEnd:
            return action.value
        default: return state
    }
}


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

const fetchQuestsListma = (filters) => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    const data = await getQuestsma(filters.ma)
    dispatch(actionCreator_getQuestsList(data))
    dispatch(actionCreator_setLoadingStatus(false))
}

const fetchGenresList = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getGenres().then(data => {
        dispatch(actionCreator_getGenresList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}

const fetchOrganizersList = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getOrganizers().then(data => {
        dispatch(actionCreator_getOrganizersList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}

const fetchBookingsList = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getBookings().then(data => {
        dispatch(actionCreator_getBookingsList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}

const fetchAllBookings = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getAllBookings().then(data => {
        dispatch(actionCreator_getBookingsList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}

const fetchStatuses = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    getStatuses().then(data => {
        dispatch(actionCreator_getStatusList(data))
        dispatch(actionCreator_setLoadingStatus(false))
    })
}


const filterBookings = (params) => async dispatch => {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    }
    let reqStr=`http://127.0.0.1:8000/allbookings/?`
    if(params['status']>0){
        reqStr+=`status=${params['status']}&`
    }
    if(params['start']!==null&&params['end']!==null){
        reqStr+=`start=${params['start']}&end=${params['end']}&`
    }
    await fetch(reqStr, requestOptions)
        .then(async (response) => {
            return await response.json();
        })
        .then(data => {
            dispatch(actionCreator_getBookingsList(data))
        })
}


const fetchAllQuestsPageData = () => async dispatch => {
    dispatch(actionCreator_setLoadingStatus(true))
    const data = await getQuestPricing()
    const pricingInfo = [data.min_price || 0, data.max_price || 0]
    dispatch(createAction_setQuestPricing(pricingInfo))
    dispatch(actionCreator_setLoadingStatus(false))
}

const myMiddlewares=[
    fetchQuestsList(),
    fetchBookingsList(),
    fetchAllBookings(),
    fetchGenresList(),
    fetchOrganizersList(),
    fetchStatuses(),
    filterBookings()
]

const store = configureStore({
    reducer: {
        questsList: questsListReducer,
        genresList: genresListReducer,
        organizersList: organizersListReducer,
        statusList: statusListReducer,
        dateValue: dateValueReducer,
        bookingsList: bookingsListReducer,
        loadingStatus: loadingStatusReducer,
        textFieldValue: textFieldValueReducer,
        questPricing: questPricingReducer,
        sliderValue: sliderValueReducer,
        isManager: isManagerReducer,
        pickedStatus: pickedStatusReducer,
        pickedStart: pickedStartReducer,
        pickedEnd: pickedEndReducer
    },
    myMiddlewares
})

export {
    actionCreator_setDateValue,
    fetchQuestsList,
    fetchQuestsListma,
    fetchBookingsList,
    fetchAllBookings,
    fetchGenresList,
    fetchOrganizersList,
    fetchStatuses,
    fetchAllQuestsPageData,
    filterBookings,
    store
}