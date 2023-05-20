import React from "react";
import {Route, Routes} from "react-router-dom";
import s from './main.module.scss'
import Home_Page from "./Home_Page/Home_Page";
import Contact_Page from "./Contact_Page/Contact_Page";
import Groups_Page from "./Groups_Page/./Groups_Page";
import Profile from "../Profile/Profile";
import GroupUser from "./Groups_Page/Group/GroupSection/GroupUsers/GroupUser";
import GroupNews from "./Groups_Page/Group/GroupSection/GroupNews/GroupNews";
import GroupChat from "./Groups_Page/Group/GroupSection/GroupChat/GroupChat";

const Main = () => {

    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/'} element={<Home_Page />}/>
                <Route path={'/groups'} element={<Groups_Page />}/>
                <Route path={'/groups/:id/*'} element={<GroupNews />}/>
                <Route path={'/groups/:id/users'} element={<GroupUser />}/>
                <Route path={'/groups/:id/chat'} element={<GroupChat />}/>
                <Route path={'/contact'} element={<Contact_Page />}/>
                <Route path={'/profile'} element={<Profile />}/>
            </Routes>
        </div>
    )
}

export default Main;
