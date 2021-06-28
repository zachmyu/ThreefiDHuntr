import React, { useEffect, useState } from 'react';
// import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as reviewActions from '../../store/reviews';

function ReviewsUpdateForm() {
    let { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state?.session?.user)
    const printerId = useSelector((state) => state?.payload.printerId)
    const currReview = useSelector(state => state?.review[id])
    const [review, setReview] = useState(currReview?.review);
    const [submission, setSubmission] = useState(false)
    const [errors, setErrors] = useState([]);

    if (!sessionUser) history.push('/')

    useEffect(() => {
        if (errors.length > 0) setSubmission(false);
        if (submission && errors.length === 0) setSubmission(true);
    },[submission, errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        // id = parseInt(id)
        setErrors([]);
        setSubmission(true);
        dispatch(reviewActions.updateReview({
            userId: sessionUser.id,
            printerId: printerId,
            review: review
        }))
            .then(() => history.push(`/users/${sessionUser.id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/users/${sessionUser.id}`)
    };

    return (
        <form className='form--container' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Review Update
                <textarea
                    className="form--element"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <button className="button2" type="submit">Update Review</button>
            <button className="button1" type="button" onClick={handleCancelClick}>Cancel</button>
        </form >
    );
}

export default ReviewsUpdateForm;
