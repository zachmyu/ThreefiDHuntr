import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };

    return (
        <div className="navbar__links">
            <button id="navbar__prof" onClick={openMenu} style={{ backgroundColor: "Transparent"}}>
                <img id="navbar__profpic" alt="profile avatar" src="/images/profile.png"></img>
                &nbsp;&nbsp;{user.username}
            </button>
            {showMenu && (
                <div id="profile-dropdown">
                    <NavLink to={`/users/${user.id}`}>
                        <button className="button1" type="button">User Info</button>
                    </NavLink>
                    <NavLink to="/createPrinter">
                        <button className="button1" type="button">Create a new printer</button>
                    </NavLink>
                    <button className="button1" onClick={logout}>Log Out</button>
                </div>
            )}
        </div>
    );
}

export default ProfileButton;
