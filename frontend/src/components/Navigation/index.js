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
      <>
        <ProfileButton user={sessionUser} />
        <NavLink to="/createPrinter">Create a new printer</NavLink>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__element">
          <NavLink className='navbar--element1' exact to="/">
            <img src='/images/Logo.png' className="homepageLogo" alt="homepageLogo"></img>
          </NavLink>
        </div>
        <div classname="navbar__element-links">
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
