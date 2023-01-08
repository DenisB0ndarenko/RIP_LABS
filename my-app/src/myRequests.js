export const getQuests = async () => {
    return await fetch(`http://localhost:8000/quests/`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getQuestsma = async (ma) => {
    return await fetch(`http://localhost:8000/questsma/?manager=${ma}`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getQuestsFiltered = async (name, max_cost, min_cost) => {
    return await fetch(`http://localhost:8000/quests/?name=${name}&max_cost=${max_cost}&min_cost=${min_cost}`)
        .then(async (response) => {
            return await (await response.json());
        })
}

export const getQuest = async (id_quest) => {
    return await fetch(`http://localhost:8000/quests/${id_quest}/`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getGenres = async () => {
    return await fetch(`http://localhost:8000/genres/`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getOrganizers = async () => {
    return await fetch(`http://localhost:8000/organizers/`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getBookings = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    return await fetch(`http://localhost:8000/bookings?user=${localStorage.getItem('userId')}`, requestOptions)
        .then(async (response) => {
            return await response.json();
        })
}

export const getAllBookings = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    return await fetch(`http://localhost:8000/allbookings`, requestOptions)
        .then(async (response) => {
            return await response.json();
        })
}

export const getStatuses = async () => {
    return await fetch(`http://localhost:8000/status/`)
        .then(async (response) => {
            return await response.json();
        })
}

export const getQuestPricing = async () => {
    return await fetch(`http://localhost:8000/questPricing/`)
        .then(async (response) => {
            return await response.json();
        })
}
