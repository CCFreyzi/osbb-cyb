import s from "./GroupChat.module.scss"
import GroupNavbar from "../../GroupNavbar";
import {db} from "../../../../../../firebase-config";
import {addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy} from "firebase/firestore";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";


const GroupChat = () => {
    const name = useSelector(state => state.auth.name);
    const group = useSelector(state => state.auth.group);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    const divRef = useRef(null);

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", group),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            const messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});

            });

            // console.log(messages);
            setMessages(messages);

        });



        return () => unsubscribe();
    }, [group]);

    useEffect(() => {
        const div = divRef.current;
        div.scrollTop = div.scrollHeight;
    }, [messages])
    const handleEnterKeyPress = (event) => {
        if (event.keyCode === 13) {
            handleSubmit()
        }
    }
    const handleSubmit = async () => {

        const div = divRef.current;
        div.scrollTop = div.scrollHeight;

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
                <div className={s.messages} ref={divRef}>
                    {messages.map(message => {
                        return <div key={message.id} className={s.message}>
                            <div>{message.user} </div>
                            <div className={s.message_text}>{': ' + message.text}</div>
                        </div>
                    })}
                </div>
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