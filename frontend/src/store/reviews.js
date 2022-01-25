import { csrfFetch } from './csrf';

const READ_SINGLE_REVIEW = "reviews/READ_SINGLE_REVIEW"
const READ_ALL_REVIEWS = "reviews/READ_ALL_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const loadOneReview = review => ({
    type: READ_SINGLE_REVIEW,
    payload: review
});

const loadAllReviews = reviews => ({
    type: READ_ALL_REVIEWS,
    payload: reviews
});

const addReview = review => ({
    type: CREATE_REVIEW,
    payload: review
});

const changeReview = reviewId => ({
    type: UPDATE_REVIEW,
    payload: reviewId
});

const removeReview = reviewId => ({
    type: DELETE_REVIEW,
    payload: reviewId
});

// const load = (reviews, id) => ({
//     type: READ_ALL_REVIEWS,
//     reviews,
//     id,
// });

// const update = (review) => ({
//     type: UPDATE_REVIEW,
//     review,
// });

const add = (review) => ({
    type: CREATE_REVIEW,
    review,
});

const remove = (reviewId, printerId) => ({
    type: DELETE_REVIEW,
    reviewId,
    printerId,
});

export const getReviews = id => async dispatch => {
    const response = await csrfFetch(`/api/printers/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews, id));
    }
};

export const getOneReview = id => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
    }
};

export const getUserReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/users/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(add(reviews))
    }
}

export const createReview = (data) => async dispatch => {
    const response = await csrfFetch(`/api/printers/${data.printerId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.userId, printerId: data.printerId, review: data.review }),
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(add(review));
        return review;
    }
};

export const updateReview = data => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(add(review));
        return review;
    }
};

export const deleteReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete',
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(remove(review.id, review.printerId));
    }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_ALL_REVIEWS: {
            const allReviews = {};
            action.reviews.forEach(review => {
                allReviews[review.id] = review;
            })
            newState = { ...allReviews }
            return newState;
        }
        case CREATE_REVIEW: {
            newState = {
                ...state,
                [action.review.id]: { ...action.review }
            }
            return newState;
        }
        // case UPDATE_REVIEW: {
        //     return {
        //         ...state,
        //         [action.review.id]: action.review,
        //     };
        // }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
