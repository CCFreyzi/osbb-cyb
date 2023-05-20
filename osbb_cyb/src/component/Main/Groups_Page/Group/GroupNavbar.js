import {NavLink, useParams} from "react-router-dom";
import s from "./Group.module.scss"
import {useSelector} from "react-redux";

const GroupNavbar = () => {
    const {id} = useParams()

    return (
        <div className={s.groupNavBar}>
            <NavLink to={`/groups/${id}/news`}>News</NavLink>
            <NavLink to={`/groups/${id}/users`}>Users</NavLink>
            <NavLink to={`/groups/${id}/events`}>Events</NavLink>
            <NavLink to={`/groups/${id}/chat`}>chats</NavLink>
        </div>
    )
}

export default GroupNavbar;