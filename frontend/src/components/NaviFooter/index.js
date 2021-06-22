import React from 'react';
import { NavLink } from 'react-router-dom';
import './NaviFooter.css';

function NaviFooter() {

    return (
        <div className="footer-container">
            <div className="footer-element">
                <a href="https://www.linkedin.com/in/zach-yu-9b86ab1b/"><i class="fab fa-linkedin"></i> Linked In</a>
            </div>
            <div className="footer-element">
                <a href="https://github.com/zachmyu"><i class="fab fa-github"></i> Github</a>
            </div>
            <div className="footer-element">
                <a href="http://zachmyu.github.io/"><i class="far fa-user-circle"></i> Created by Zach Yu</a>
            </div>
        </div>
    );
}

export default NaviFooter;
