import { combineReducers } from '@reduxjs/toolkit'

import loadingStatusReducer from './loadingStatusReducer'
import questsListReducer from "./questsListReducer";
import {questsListReducer_var} from "./questsListReducer";
import {loadingStatusReducer_var} from "./loadingStatusReducer";

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    loadingStatus: loadingStatusReducer,
    questsList: questsListReducer
})

export default rootReducer
