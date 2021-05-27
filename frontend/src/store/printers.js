import { csrfFetch } from './csrf';
import { LOAD_REVIEWS, REMOVE_REVIEW, ADD_REVIEW } from './reviews';

const LOAD = 'printers/LOAD';
const LOAD_FEATURES = 'printers/LOAD_FEATURES';
const ADD_ONE = 'printers/ADD_ONE';

const load = list => ({
  type: LOAD,
  list,
});

const loadFeatures = features => ({
  type: LOAD_FEATURES,
  features,
});

const addOnePrinter = printer => ({
  type: ADD_ONE,
  printer,
});

export const createPrinter = printer => async dispatch => {
  const { brand, model, description, retailPrice, videoUrl, pictureUrl, retailStatus } = printer
  const response = await csrfFetch(`/api/printers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      brand,
      model,
      description,
      retailPrice,
      videoUrl,
      pictureUrl,
      retailStatus,
    }),
  });

  if (response.ok) {
    const printer = await response.json();
    dispatch(addOnePrinter(printer));
    return printer;
  }
};

export const updatePrinter = data => async dispatch => {
  const response = await csrfFetch(`/api/printers/${data.id}`, {
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
  const response = await csrfFetch(`/api/printers/${id}`);

  if (response.ok) {
    const printer = await response.json();
    dispatch(addOnePrinter(printer));
  }
};

export const getPrinters = () => async dispatch => {
  const response = await csrfFetch(`/api/printers`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getPrinterFeatures = () => async dispatch => {
  const response = await csrfFetch(`/api/features`);

  if (response.ok) {
    const features = await response.json();
    dispatch(loadFeatures(features));
  }
};

const initialState = {
  list: [],
  features: []
};

const sortList = (list) => {
  return list.sort((printerA, printerB) => {
    return printerA.id - printerB.id;
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
    case LOAD_FEATURES: {
      return {
        ...state,
        features: action.features,
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
