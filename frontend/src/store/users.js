import { LOAD_REVIEWS, REMOVE_REVIEW } from './reviews';

const SET_USER = 'session/setUser';
const DELETE_USER = 'session/removeUser';
const LOAD = 'users/LOAD';

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
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

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

const load = list => ({
  type: LOAD,
  list,
});

const addOnePrinter = printer => ({
  type: ADD_ONE,
  printer,
});

export const updateUser = data => async dispatch => {
  const response = await fetch(`/api/users/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(addOnePrinter(user));
    return printer;
  }
};

export const getOneUser = id => async dispatch => {
  const response = await fetch(`/api/users/${id}`);

  if (response.ok) {
    const user = await response.json();
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

const initialState = {
  list: [],
  features: []
};

const sortList = (list) => {
  return list.sort((userA, userB) => {
    return userA.username - userB.username;
  }).map((user) => user.id);
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allUsers = {};
      action.list.forEach(user => {
        allUsers[user.id] = user;
      });
      return {
        ...allUsers,
        ...state,
        list: sortList(action.list),
      };
    }
    // case LOAD_FEATURES: {
    //   return {
    //     ...state,
    //     features: action.features,
    //   };
    // }
    // case ADD_ONE: {
    //   if (!state[action.printer.id]) {
    //     const newState = {
    //       ...state,
    //       [action.printer.id]: action.printer
    //     };
    //     const printerList = newState.list.map(id => newState[id]);
    //     printerList.push(action.printer);
    //     newState.list = sortList(printerList);
    //     return newState;
    //   }
    //   return {
    //     ...state,
    //     [action.printer.id]: {
    //       ...state[action.printer.id],
    //       ...action.printer,
    //     }
    //   };
    // }
    case LOAD_REVIEWS: {
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          reviews: action.reviews.map(review => review.id),
        }
      };
    }
    case REMOVE_REVIEW: {
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          reviews: state[action.userId].filter(
            (review) => review.id !== action.reviewId
          ),
        },
      };
    }
    default:
      return state;
  }
}

export default userReducer;
