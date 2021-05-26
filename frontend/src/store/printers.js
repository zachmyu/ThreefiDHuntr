import { LOAD_REVIEWS, REMOVE_REVIEW, ADD_REVIEW } from './reviews';

const LOAD = 'printers/LOAD';
const LOAD_TYPES = 'printers/LOAD_TYPES';
const ADD_ONE = 'printers/ADD_ONE';

const load = list => ({
  type: LOAD,
  list,
});

const loadTypes = types => ({
  type: LOAD_TYPES,
  types,
});

const addOnePrinter = printer => ({
  type: ADD_ONE,
  printer,
});

export const createPrinter = data => async dispatch => {
  console.log(data);
  const response = await fetch(`/api/printer`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const printer = await response.json();
    dispatch(addOnePrinter(printer));
    return printer;
  }
};

export const updatePrinter = data => async dispatch => {
  const response = await fetch(`/api/printer/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const printer = await response.json();
    dispatch(addOnePrinter(printer));
    return printer;
  }
};

export const getOnePrinter = id => async dispatch => {
  const response = await fetch(`/api/printer/${id}`);

  if (response.ok) {
    const printer = await response.json();
    dispatch(addOnePrinter(printer));
  }
};

export const getPrinters = () => async dispatch => {
  const response = await fetch(`/api/printers`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getPrinterTypes = () => async dispatch => {
  const response = await fetch(`/api/printer/types`);

  if (response.ok) {
    const types = await response.json();
    dispatch(loadTypes(types));
  }
};

const initialState = {
  list: [],
  types: []
};

const sortList = (list) => {
  return list.sort((printerA, printerB) => {
    return printerA.no - printerB.no;
  }).map((printer) => printer.id);
};

const printerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allPrinter = {};
      action.list.forEach(printer => {
        allPrinter[printer.id] = printer;
      });
      return {
        ...allPrinter,
        ...state,
        list: sortList(action.list),
      };
    }
    case LOAD_TYPES: {
      return {
        ...state,
        types: action.types,
      };
    }
    case ADD_ONE: {
      if (!state[action.printer.id]) {
        const newState = {
          ...state,
          [action.printer.id]: action.printer
        };
        const printerList = newState.list.map(id => newState[id]);
        printerList.push(action.printer);
        newState.list = sortList(printerList);
        return newState;
      }
      return {
        ...state,
        [action.printer.id]: {
          ...state[action.printer.id],
          ...action.printer,
        }
      };
    }
    case LOAD_REVIEWS: {
      return {
        ...state,
        [action.printerId]: {
          ...state[action.printerId],
          reviews: action.reviews.map(review => review.id),
        }
      };
    }
    case REMOVE_REVIEW: {
      return {
        ...state,
        [action.printerId]: {
          ...state[action.printerId],
          reviews: state[action.printerId].filter(
            (review) => review.id !== action.reviewId
          ),
        },
      };
    }
    case ADD_REVIEW: {
      console.log(action.review);
      return {
        ...state,
        [action.review.printerId]: {
          ...state[action.review.printerId],
          reviews: [...state[action.review.printerId], action.review.id],
        },
      };
    }
    default:
      return state;
  }
}

export default printerReducer;
