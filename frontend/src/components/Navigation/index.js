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
            <div>
                <ProfileButton user={sessionUser} />
                <NavLink to="/createPrinter">
                    <button type="button">
                        Create a new printer
                    </button>
                </NavLink>
            </div>
        );
    } else {
        sessionLinks = (
            <div>
                <LoginFormModal />
                <NavLink to="/signup">
                    <button type="button">
                        Sign Up
                    </button>
                </NavLink>
            </div>
        );
    }

    return (
        <div className="navbar">
            <div className="navbar__element">
                <NavLink className='navbar--element1' exact to="/">
                    <img src='/images/Logo.png' className="homepageLogo" alt="homepageLogo"></img>
                </NavLink>
            </div>
            <div className="navbar__element-links">
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
