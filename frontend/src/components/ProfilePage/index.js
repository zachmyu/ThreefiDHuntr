import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOneUser } from '../../store/session'
// import ProfileUpdate from '../ProfileUpdateModal/ProfileUpdateModal';


const UserPage = () => {

  const { id } = useParams();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session)
  const history = useHistory();
  // const [showEditPrinterForm, setShowEditPrinterForm] = useState(false);

  useEffect(() => {
    dispatch(getOneUser(id));
    // setShowEditPrinterForm(false);
  }, [dispatch, id]);

  if (!user) history.push('/');

  let content = null;

  if (sessionUser) {
    content = (
      <div className="User__Edit">
        {/* <ProfileUpdate /> */}
        {/* <ReviewFormModal /> */}
      </div>)
  } else {
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
          {/* Add a list of user submitted reviews here? */}
        </div>
      </div>
      {content}
    </div>
  );
}

export default UserPage;
