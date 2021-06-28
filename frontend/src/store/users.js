// import { LOAD_REVIEWS, REMOVE_REVIEW } from './reviews';

// const LOAD = 'users/LOAD'
// const ADD_USER = 'session/setUser';
// const DELETE_USER = 'session/removeUser';
// const LOAD = 'users/LOAD';

// const load = users => ({
//     type: LOAD,
//     users,
// });







// const initialState = { user: null };

// const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOAD: {
//             const allUsers = {};
//             action.list.forEach(user => {
//                 allUsers[user.id] = user;
//             });
//             return {

//                 ...state,

//             };
//         }
//         case LOAD_REVIEWS: {
//             return {
//                 ...state,
//                 [action.userId]: {
//                     ...state[action.userId],
//                     reviews: action.reviews.map(review => review.id),
//                 }
//             };
//         }
//         case REMOVE_REVIEW: {
//             return {
//                 ...state,
//                 [action.userId]: {
//                     ...state[action.userId],
//                     reviews: state[action.userId].filter(
//                         (review) => review.id !== action.reviewId
//                     ),
//                 },
//             };
//         }
//         default:
//             return state;
//     }
// }

// export default userReducer;
