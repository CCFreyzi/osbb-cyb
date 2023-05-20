import s from "./GroupChat.module.scss"
import GroupNavbar from "../../GroupNavbar";


const GroupChat = () => {

    return (
        <div className={s.groupChatPage}>
            <GroupNavbar/>
            <div className={s.chat}>
                GroupChat
            </div>
        </div>
    )
}

export default GroupChat;