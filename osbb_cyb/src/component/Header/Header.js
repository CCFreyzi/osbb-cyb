import React, {useEffect, useState} from "react";
import s from './header.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase-config";
import {setData} from "../../store/slice/auth-slice";

const Header = () => {
    const [isActive, setIsActive] = useState(true);
    const dispatch = useDispatch()
    const email = useSelector(state => state.auth.email)

    const toggleClass = () => {
        setIsActive(prevState => !prevState);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            dispatch(setData({email: currentUser.email}))
        });
    }, [])

    return (
        <header className={s.header}>
            <div className={s.navbar}>
                <div className={s.logo}>
                    <img src='../../img/logo/photo_2023-04-13_15-51-26.jpg' alt={''}/>
                    <NavLink to='/'>Osbb-Cyb</NavLink>
                </div>
                <ul className={s.links}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/management">Management</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className={s.profile_section}>
                    <span className={s.email}>{email}</span>
                    <NavLink to={'/login'} className={s.action_btn}>Sign up</NavLink>
                    <NavLink to={'/register'} className={s.action_btn}>Sign in</NavLink>
                </div>

                <div className={s.toggle_btn} onClick={() => toggleClass()}>
                    <i className={`${isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}`}></i>
                </div>
            </div>
            <div className={`${s.dropdown_menu}` + ' ' + `${isActive ? s.open : ""}`}>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/management">Management</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to={'/profile'} className={s.action_btn}>Profile</NavLink></li>
            </div>

        </header>
    )
}

export default Header;
