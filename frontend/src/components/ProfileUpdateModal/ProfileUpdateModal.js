import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileUpdate.css';

function ProfileUpdate() {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState({ fullName });
    const [email, setEmail] = useState({ email });
    const [about, setAbout] = useState({ about });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.updateUser({ fullName, email, about })).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
        <form className='form--container' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Full Name
                <input
                    className="form--element--container"
                    type="text"
                    value={credential}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </label>
            <label>
                Email
                <input
                    className="form--element--container"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                About
                <input
                    className="form--element--container"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                />
            </label>
            <button className="button2" type="submit">Update</button>
        </form>
    );
}

export default ProfileUpdate;
