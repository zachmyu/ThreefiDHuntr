import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import * as reviewActions from '../../store/reviews';

function ReviewFormModal() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const [review, setReview] = useState('');
    const [submission, setSubmission] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    let { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        id = parseInt(id)
        setErrors([]);
        setSubmission(true);
        dispatch(reviewActions.createReview({
            userId: sessionUser.id,
            printerId: id,
            review: review
        }))
            .then(setShowModal(false))
            .then(() => history.push(`/printers/${id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    useEffect(() => {
        if (errors.length > 0) setSubmission(false);
        if (submission && errors.length === 0) setSubmission(true);
    },[submission, errors])

    return (
        <>
            <button className="button1" type="button" onClick={() => setShowModal(true)}>Add Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form className='form--container' onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <label>
                            Review
                            <textarea
                                className="form--element"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                        </label>
                        <button className="button2" type="submit">Submit Review</button>
                    </form >
                </Modal>
            )}
        </>
    );
}

export default ReviewFormModal;
