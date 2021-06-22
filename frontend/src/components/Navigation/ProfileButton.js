import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div>
            <button
                    class="navbar__links"
                    style={{ backgroundColor: "Transparent", backgroundImage: "url(/images/profile.png)", backgroundSize: "50px", width: "50px", height: "50px", border: "none" }}
                    onClick={openMenu}>
            </button>
            {showMenu && (
                    <div className="profile-dropdown">
                        <div>
                                <a href={`/users/${user.id}`}>{user.username}</a></div>
                        <div> <button onClick={logout}>Log Out</button> </div>

                    </div>
            )}
        </div>
    );
}

export default ProfileButton;
