import React, {useEffect, useState} from "react";
import s from './header.module.scss';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../../firebase-config";
import {setAnotherData, setAuth, setEmailAndUid, setGroup} from "../../store/slice/auth-slice";
import {getDoc, doc} from "firebase/firestore";
import {RiUserLine} from 'react-icons/ri';

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();
    const fullName = useSelector(state => state.auth.name);
    const isAuth = useSelector(state => state.auth.isAuth);

    const toggleClass = () => {
        setIsActive(prevState => !prevState);
    };

    useEffect(() => {
        // Коли користувач увійшов в систему або вийшов з неї,
        // функція onAuthStateChanged повідомляє про це всі компоненти програми,
        // які підписалися на її події.
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser !== null) {
                dispatch(setEmailAndUid({email: currentUser.email, id: currentUser.uid}));
                dispatch(setAuth(true));


                const userDocRef = doc(db, 'users', currentUser.uid);
                getDoc(userDocRef)
                    .then((doc) => {
                        const name = doc.data().name;
                        const surName = doc.data().surName;

                        const city = doc.data().city;
                        const street = doc.data().street;
                        const phonenumber = doc.data().phonenumber;
                        const apartmentnumber = doc.data().apartmentnumber;
                        const group = doc.data().group;


                        dispatch(setAnotherData({name, surname: surName, city, street, phonenumber, apartmentnumber}))
                        dispatch(setGroup({group: group}))
                    })
                    .catch((error) => {
                        console.log("Помилка отримання документів:", error);
                    });
            }
        })
    }, [])

    return (
        <header className={s.header}>
            <div className={s.navbar}>
                <div className={s.logo}>
                    {/*<img src='img/photo_2023-04-13_15-51-26.jpg' alt={''}/>*/}
                    <NavLink to='/'>Osbb-HsH</NavLink>
                </div>
                <ul className={s.links}>
                    <li><NavLink to="/">Home</NavLink></li>
                    {isAuth
                        ? <li><NavLink to="/groups">Groups</NavLink></li>
                        : ''}
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className={s.profile_section}>
                    <RiUserLine size='1.6rem'/>
                    <span className={s.email}>{fullName}</span>
                    <NavLink to={'/profile'} className={s.action_btn}>Profile</NavLink>
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
