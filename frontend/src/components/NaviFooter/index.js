import React from 'react';
import { NavLink } from 'react-router-dom';
import './NaviFooter.css';

function NaviFooter() {

  return (
    <ul>
      <li>
        <NavLink exact to="/">Linked In</NavLink>
        <NavLink exact to="/">Git Hub</NavLink>
        <NavLink exact to="/">Website</NavLink>
      </li>
    </ul>
  );
}

export default NaviFooter;
