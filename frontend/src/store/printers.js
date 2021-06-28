import { csrfFetch } from './csrf';
import { LOAD_REVIEWS, ADD_REVIEW } from './reviews';

const LOAD = 'printers/LOAD';
const ADD_ONE = 'printers/ADD_ONE';
const DEL_PRINTER = 'printers/DEL_PRINTER'
const LOAD_FEATURES = 'printers/LOAD_FEATURES'

//Actions
const load = printers => ({
    type: LOAD,
    printers,
});

const addOnePrinter = printer => ({
    type: ADD_ONE,
    printer,
});

const delPrinter = printerId => ({
    type: DEL_PRINTER,
    printerId
})

const loadFeatures = feature => ({
    type: LOAD_FEATURES,
    feature
})

//Thunks!!
//CREATE
export const createPrinter = printer => async dispatch => {
    const { brand, model, description, retailPrice, videoUrl, pictureUrl, retailStatus, features } = printer
    debugger
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
            features
        }),
    });

    if (response.ok) {
        const printer = await response.json();
        dispatch(addOnePrinter(printer));
        return printer;
    }
};

//READ ONE
export const getOnePrinter = id => async dispatch => {
    const response = await csrfFetch(`/api/printers/${id}`);
    if (response.ok) {
        const printer = await response.json();
        dispatch(addOnePrinter(printer));
    }
};

//READ ALL
export const getPrinters = () => async dispatch => {
    const response = await csrfFetch(`/api/printers`);

    if (response.ok) {
        const printers = await response.json();
        dispatch(load(printers));
    }
};

export const getPrinterFeatures = () => async dispatch => {
    const response = await csrfFetch(`/api/features`);

    if (response.ok) {
        const features = await response.json();
        dispatch(loadFeatures(features));
    }
};

//UPDATE
export const updatePrinter = data => async dispatch => {
    const response = await csrfFetch(`/api/printers/${data.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const printer = await response.json();
        dispatch(addOnePrinter(printer));
        return printer;
    }
};

//DELETE
export const deletePrinter = printerId => async dispatch => {
    const response = await csrfFetch(`/api/printers/${printerId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const printer = await response.json();
        dispatch(delPrinter(printerId));
        return printer;
    }
}

const initialState = {};

//REDUCER
const printerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            const allPrinter = {};
            action.printers.forEach(printer => {
                allPrinter[printer.id] = printer;
            });
            newState = { ...allPrinter }
            return newState;
        }
        case LOAD_FEATURES: {
            newState = {
                ...state,
                feature: action.feature
            }
            return newState;
        }
        case ADD_ONE: {
            // if (!state[action.printer.id]) {
            //     const newState = {
            //         ...state,
            //         [action.printer.id]: action.printer
            //     };
            //     const printerList = newState.list.map(id => newState[id]);
            //     printerList.push(action.printer);
            //     newState.list = sortList(printerList);
            //     return newState;
            // }
            newState = {
                ...state,
                [action.printer.id]: {...action.printer}
            }
            return newState;
        }
        case DEL_PRINTER: {
            newState = { ...state }
            delete newState[action.printerId]
            return newState;
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

        case ADD_REVIEW: {
            // console.log(action.review);
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
