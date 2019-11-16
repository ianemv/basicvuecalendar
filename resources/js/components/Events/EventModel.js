import axios from 'axios';

const API_ROUTE = '/api/v1/events/';

export const addEvent = (event) => {
    return axios.post('/api/v1/events',event);
}

export const updateEvent = (event) => {
    return axios.put(API_ROUTE+event.id,event);
}

export const getEvent = (id) => {
    return axios.get(API_ROUTE+id);
}

export const deleteEvent = (id) => {
    return axios.delete(API_ROUTE+id);
}

export const getEvents = () => {

    return axios.get(`${API_ROUTE}`);
}
