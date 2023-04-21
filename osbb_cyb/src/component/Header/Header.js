import React, {useEffect, useState} from "react";
import s from './header.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth, db} from "../../firebase-config";
import {setAnotherData, setEmailAndUid} from "../../store/slice/auth-slice";
import {collection, getDoc, doc} from "firebase/firestore";
import {RiUserLine} from 'react-icons/ri'

const Header = () => {
    const [isActive, setIsActive] = useState(true);
    const dispatch = useDispatch()
    const fullName = useSelector(state => state.auth.name)

    const toggleClass = () => {
        setIsActive(prevState => !prevState);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser !== null) {
                dispatch(setEmailAndUid({email: currentUser.email, id: currentUser.uid}));

                const userDocRef = doc(db, 'users', currentUser.uid);
                getDoc(userDocRef)
                    .then((doc) => {
                        const name = doc.data().name;
                        const surName = doc.data().surName;
                        const age = doc.data().age;

                        dispatch(setAnotherData({name: name, surname: surName, age: age}))
                    })
                    .catch((error) => {
                        console.log("Помилка отримання документів:", error);
                    });
            }
        })
    }, [])

    const logout = async () => {
        dispatch(setEmailAndUid({email: '', id: ''}))
        dispatch(setAnotherData({name:'', surname: '', age: 0}))
        await signOut(auth);

    };

    return (
        <header className={s.header}>
            <div className={s.navbar}>
                <div className={s.logo}>
                    {/*<img src='img/photo_2023-04-13_15-51-26.jpg' alt={''}/>*/}
                    <NavLink to='/'>Osbb-HsH</NavLink>
                </div>
                <ul className={s.links}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/management">Management</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className={s.profile_section}>
                    <RiUserLine size='1.6rem'/>
                    {/*<img src='img/icons_user.png' />*/}
                    <span className={s.email}>{fullName}</span>
                    <NavLink to={'/profile'} className={s.action_btn}>Profile</NavLink>
                    {/*<button onClick={logout} className={s.action_btn}>Log out</button>*/}

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
