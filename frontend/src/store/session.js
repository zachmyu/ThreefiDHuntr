import { csrfFetch } from './csrf';
// import { LOAD_REVIEWS } from './reviews';

const LOAD = 'session/LOAD';
const ADD_ONE = 'session/ADD_ONE'
// const DEL_USER = 'users/DEL_USER'
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


//Actions
const load = users => ({
    type: LOAD,
    payload: users,
});

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
    payload: user,
});

// const delUser = userId => ({
//     type: DEL_USER,
//     payload: userId
// })


//Thunks!!
//CREATE
export const signup = (user) => async dispatch => {
    const { username, fullName, email, about, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            fullName,
            email,
            about,
            password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data;
    }
};

//RESTORE SESSION
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//READ ONE
export const getOneUser = id => async dispatch => {
    const response = await fetch(`/api/users/${id}`);
    if (response.ok) {
        const user = await response.json();
        dispatch(addOneUser(user));
    }
};

//READ ALL
export const getUsers = () => async dispatch => {
    const response = await fetch(`/api/users`);
    if (response.ok) {
        const users = await response.json();
        dispatch(load(users));
    }
};

//UPDATE
export const updateUser = (data, id) => async dispatch => {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(addOneUser(user));
        return user;
    }
};

//DELETE
// export const deleteUser = userId => async dispatch => {
//     const response = await csrfFetch(`/api/users/${userId}`, {
//         method: "DELETE"
//     })
//     if (response.ok) {
//         const user = await response.json();
//         dispatch(delUser(user))
//     }
// }

//LOGIN
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
    return data;
};

//LOGOUT
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};



// const sortList = (list) => {
//     return list.sort((userA, userB) => {
//         return userA.username - userB.username;
//     }).map((user) => user.id);
// };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            const allUsers = {};
            action.payload.forEach(user => {
                allUsers[user.id] = user;
            });
            newState = { ...allUsers }
            return newState;
        }
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
            newState.user = action.payload
            return newState;
        };
        // case DEL_USER: {
        //     newState = { ...state }
        //     delete newState[action.payload]
        //     return newState;
        // };
        // case LOAD_REVIEWS: {
        //     newState = {
        //         ...state,
        //         [action.payload]: {
        //             ...state[action.payload],
        //             reviews: action.reviews.map(review =>
        //                 review.id)
        //         }
        //     }

        // }
        default:
            return state;
    }
};

export default sessionReducer;
