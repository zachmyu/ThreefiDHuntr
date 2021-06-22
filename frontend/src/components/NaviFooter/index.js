import React from 'react';
import './NaviFooter.css';

function NaviFooter() {

    return (
        <div className="footer-container">
            <div className="footer-element">
                <a href="https://www.linkedin.com/in/zach-yu-9b86ab1b/"><i className="fab fa-linkedin"></i> Linked In</a>
            </div>
            <div className="footer-element">
                <a href="https://github.com/zachmyu"><i className="fab fa-github"></i> Github</a>
            </div>
            <div className="footer-element">
                <a href="http://zachmyu.github.io/"><i className="far fa-user-circle"></i> Created by Zach Yu</a>
            </div>
        </div>
    );
}

export default NaviFooter;
