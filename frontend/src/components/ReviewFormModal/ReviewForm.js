// import React, { useState } from 'react';
// import { useParams } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reviewActions from '../../store/reviews';
// import './ReviewForm.css';

//     function ReviewForm() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user)
//     const [review, setReview] = useState('');
//     const [errors, setErrors] = useState([]);
//     const { printerId } = useParams()

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("printerrrrrrrrrrrrId???", printerId)
//         setErrors([]);
//         // return dispatch(reviewActions.createReview({ userId: sessionUser.id, printerId, review, })).catch(async (res) => {
//         //     const data = await res.json();
//         //     if (data && data.errors) setErrors(data.errors);
//         // });
//     }

//     return (
//         <form className='form--container' onSubmit={handleSubmit}>
//             <ul>
//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <label>
//                 Review
//                 <textarea
//                     className="form--element"
//                     value={review}
//                     onChange={(e) => setReview(e.target.value)}
//                     required
//                 />
//             </label>

//             {/* <input
//                 type="text"
//                 value={sessionUser.id}
//                 required
//                 hidden
//             /> */}
//             <input
//                 type="text"
//                 value={printerId}
//                 required
//                 hidden
//             />

//             <button className="button2" type="submit">Submit Review</button>
//         </form >
//     );
// }

// export default ReviewForm;
