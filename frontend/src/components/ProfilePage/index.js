import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getOneUser } from '../../store/session'
// import ReviewEditModal from '../ReviewEditModal';

import './Profile.css'
// import ProfileUpdate from '../ProfileUpdateModal/ProfileUpdateModal';

const UserPage = () => {
    const sessionUser = useSelector((state) => state.session)
    const { id } = useParams();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOneUser(id));
    }, [dispatch, id]);

    if (!user.id || !user) history.push('/');

    let content = null;
    // let reviewEdit = null;
    if (sessionUser) {
        // reviewEdit = (
        //     <div className="review__edit">
        //         {/* <ReviewEditModal /> */}
        //     </div>
        // )
        content = (
            <div className="User__Edit">
                {/* <ProfileUpdate /> */}
                {/* <ReviewFormModal /> */}
            </div>
        )
    } else {
        // reviewEdit = (
        //     <h3>Please log in to edit your comments!</h3>
        // )
        content = (
            <h3>Please log in to edit your account!</h3>
        )
    }

    return (
        <div className="user-detail">
            <div>
                <div>
                    <h1 className="user-element">{user.username}'s Profile Page!</h1>
                </div>
                <div>
                    <p className="user-element">Name: {user.fullName}</p>
                </div>
                <div>
                    <p className="user-element">About: {user.about}</p>
                </div>
                <div>
                    <h2 id="user-review__title">Reviews submitted by {user.username}</h2>
                    {user?.PrinterReviews?.map(review => {
                        return (
                            <div className="user-review-card" key={review.id}>
                                {review?.review}
                                {/* <NavLink to={`/reviews/${review.id}`}>
                                    <button className="button1" type="button">Edit Review</button>
                                </NavLink> */}
                            </div>
                        )
                        // {reviewEdit}
                    })}
                </div>
            </div>
            {content}
        </div>
    );
}

export default UserPage;
