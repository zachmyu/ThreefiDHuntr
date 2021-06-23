import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as printerActions from '../../store/printers';
import ProfileButton from './ProfileButton';
import CreatePrinterForm from '../PrinterCreateForm';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='navbar__user'>
                <ProfileButton user={sessionUser}/>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='navbar__logged-out'>
                <LoginFormModal />
                <NavLink to="/signup">
                    <button className="button3" type="button">Sign Up</button>
                </NavLink>
            </div>
        );
    }

    return (
        <div className="navbar">
            <NavLink className='navbar__title' exact to="/">
                <img src='/images/Logo.png' className="homepageLogo" alt="homepageLogo"></img>
            </NavLink>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
