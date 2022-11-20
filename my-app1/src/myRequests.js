export const getQuests = async () => {
    return await fetch(`http://localhost:8000/quests/`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getQuest = async (id_quest) => {
    return await fetch(`http://localhost:8000/quests/${id_quest}/`)
        .then(async (response) => {
            return await response.json();
        })
}

/*
export const getOrganizerOfQuest = async (quest_id) => {
    return await fetch(`http://localhost:8000/quests/${quest_id}`)
        .then(async (response) => {
            return await response.json();
        })
}
 */