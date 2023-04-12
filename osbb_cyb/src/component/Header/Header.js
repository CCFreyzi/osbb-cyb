import React, {useState} from "react";
import s from './header.module.scss'
import {NavLink} from "react-router-dom";

const Header = () => {
    const [isActive, setIsActive] = useState(true);

    const toggleClass = () => {
        setIsActive(prevState => !prevState);
    };

    return (
        <header className={s.header}>
            <div className={s.navbar}>
                <div className={s.logo}>
                    <NavLink to='/home'>Osbb-Cyb</NavLink>
                </div>
                <ul className={s.links}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/management">Management</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <NavLink to={'/profile'} className={s.action_btn}>Profile</NavLink>
                <div className={s.toggle_btn} onClick={() => toggleClass()}>
                    <i className={`${isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}`}></i>
                </div>
            </div>

            <div className={`${s.dropdown_menu}` + ' ' + `${ isActive ? s.open : ""}` }>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/management">Management</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to={'/profile'} className={s.action_btn}>Profile</NavLink></li>
            </div>
        </header>
    )
}

export default Header;