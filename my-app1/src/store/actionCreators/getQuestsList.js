import {getQuestsList} from "../actions/getQuestsList";

export const actionCreator_getQuestsList = (list) => {
    return {
        type: getQuestsList,
        value: list
    }
}
