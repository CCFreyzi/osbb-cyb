import React from "react";
import {Route, Routes} from "react-router-dom";
import s from './main.module.scss'
import Home_Page from "./Home_Page/Home_Page";
import Profile_Page from "./Profile_Page/Profile_Page";
import Contact_Page from "./Contact_Page/Contact_Page";
import Management_Page from "./Management_Page/Management_Page";

const Main = () => {

    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/'} element={<Home_Page />}/>
                <Route path={'/management'} element={<Management_Page />}/>
                <Route path={'/contact'} element={<Contact_Page />}/>
                <Route path={'/profile'} element={<Profile_Page />}/>
            </Routes>
        </div>
    )
}

export default Main;