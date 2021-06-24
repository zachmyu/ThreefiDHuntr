import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_ONE = 'session/ADD_ONE'
const LOAD = 'session/LOAD';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const addOneUser = user => ({
    type: ADD_ONE,
    user,
});

const load = list => ({
    type: LOAD,
    list,
});

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const getOneUser = id => async dispatch => {
    const response = await fetch(`/api/users/${id}`);

    if (response.ok) {
        const user = await response.json();
        console.log("Miah said poop", user)
        dispatch(addOneUser(user));
    }
};

export const getUsers = () => async dispatch => {
    const response = await fetch(`/api/users`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

export const updateUser = (user) => async dispatch => {
    const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(addOneUser(user));
        return user;
    }
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, fullName, email, about, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            fullName,
            email,
            about,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

const sortList = (list) => {
    return list.sort((userA, userB) => {
        return userA.username - userB.username;
    }).map((user) => user.id);
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER: {
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        case ADD_ONE: {
            const newState = {}
            newState.user = action.user
            return newState;
        };
        default:
            return state;
    }
};

export default sessionReducer;
