import React from "react";
import {Route, Routes} from "react-router-dom";
import s from './main.module.scss'
import Home_Page from "./Home_Page/Home_Page";
import Contact_Page from "./Contact_Page/Contact_Page";
import Management_Page from "./Management_Page/Management_Page";
import Register from "../Auth/register/register";
import LoginPage from "../Auth/login-page/login-page";
import Profile from "../Profile/Profile";

const Main = () => {

    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/'} element={<Home_Page />}/>
                <Route path={'/management'} element={<Management_Page />}/>
                <Route path={'/contact'} element={<Contact_Page />}/>
                <Route path={'/login'} element={<LoginPage />}/>
                <Route path={'/register'} element={<Register />}/>
                <Route path={'/profile'} element={<Profile />}/>
            </Routes>
        </div>
    )
}

export default Main;
