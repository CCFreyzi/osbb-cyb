import s from "./GroupChat.module.scss"
import GroupNavbar from "../../GroupNavbar";
import {db} from "../../../../../../firebase-config";
import {addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";


const GroupChat = () => {
    const name = useSelector(state => state.auth.name);
    const group = useSelector(state => state.auth.group);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", group),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            // console.log(messages);
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [group]);

    const handleEnterKeyPress = (event) => {
        if (event.keyCode === 13) {
            handleSubmit()
        }
    }
    const handleSubmit = async () => {

        if (newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: name,
            room: group,
        });

        setNewMessage("");
    }

    return (
        <div className={s.groupChatPage}>
            <GroupNavbar/>
            <div className={s.chat}>

                {messages.map(message => {
                    return <div key={message.id} className={s.message}>
                        <div>{message.user} </div>
                        <div className={s.message_text}>{': ' + message.text}</div>
                    </div>
                })}
                <div className={s.chat_form}>
                    <input className={s.chat_input} type={"text"} placeholder={'Write a messages...'}
                           value={newMessage}
                           onChange={event => setNewMessage(event.target.value)}
                           onKeyDown={event => handleEnterKeyPress(event)}
                    />
                    <div className={s.chat_btn} onClick={handleSubmit} id={'Button'}>Send</div>
                </div>
            </div>
        </div>
    )
}

export default GroupChat;