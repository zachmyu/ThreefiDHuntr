export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const LOAD_USER_REVIEWS = "reviews/LOAD_USER_REVIEWS";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const ADD_REVIEW = "reviews/ADD_REVIEW";

const load = (reviews, id) => ({
    type: LOAD_REVIEWS,
    reviews,
    id,
});

// const loadUserRev = (reviews, id) => ({
//     type: LOAD_USER_REVIEWS,
//     reviews,
//     id
// })

const update = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

const add = (review) => ({
    type: ADD_REVIEW,
    review,
});

const remove = (reviewId, printerId) => ({
    type: REMOVE_REVIEW,
    reviewId,
    printerId,
});

export const getReviews = (id) => async dispatch => {
    const response = await fetch(`/api/printer/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews, id));
    }
};

export const getUserReviews = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews, id))
    }
}

export const createReview = (data, printerId) => async dispatch => {
    const response = await fetch(`/api/printer/${printerId}/reviews`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(add(review));
        return review;
    }
};

export const updateReview = data => async dispatch => {
    const response = await fetch(`/api/reviews/${data.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(update(review));
        return review;
    }
};

export const deleteReview = reviewId => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'delete',
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(remove(review.id, review.printerId));
    }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newReviews = {};
            action.reviews.forEach(review => {
                newReviews[review.id] = review;
            })
            return {
                ...state,
                ...newReviews
            }
        }
        case REMOVE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        case ADD_REVIEW:
        case UPDATE_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review,
            };
        }
        default:
            return state;
    }
};

export default reviewsReducer;
