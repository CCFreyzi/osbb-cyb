import s from './EnterGroup.module.scss'
import {GiIronCross} from 'react-icons/gi'
import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase-config";
import {setGroupData} from "../../../store/slice/group-slice";
import {useDispatch, useSelector} from "react-redux";
import {setGroup} from "../../../store/slice/auth-slice";


const EnterGroup = ({groupKey, groupID, writeKeyBlock}) => {

    const dispatch = useDispatch()
    const usersId = useSelector(state => state.auth.id)
    const [enterKey, setEnterKey] = useState('')
    const [users, setUsers] = useState([])

    const cancelShowing = () => {
        writeKeyBlock('', '')
    }


    const writeData = async () => {
        const userDocRef = doc(db, 'groups', groupID);
        const userDoc = doc(db, "users", usersId)


        getDoc(userDocRef)
            .then((doc) => {
                const users = doc.data().users;
                setUsers(users);
                return users;
            })
            .then((users) => {
                dispatch(setGroup({group: groupID}))
                updateDoc(userDocRef, {users: [...users, {role: 'member', id: usersId}]});
                updateDoc(userDoc, {group: groupID});
            })

            .catch((error) => {
                console.log("Помилка отримання данних групи:", error);
            });
    }
    const joinGroup = () => {
        if (enterKey === groupKey) {
            writeData()
        }
    }

    return (
        <div className={s.selectCreatePage}>

            <div className={s.selectCreateBlock}>
                <div>
                    <h3 className={s.title_window}>Key</h3>
                    <GiIronCross size={21} className={s.GiIronCross} onClick={cancelShowing}/>
                </div>
                <input type={"text"} className={s.groupName} onChange={event => setEnterKey(event.target.value)}
                       placeholder={'Key...'}/>
                <input type={"button"} className={s.groupNameBtn} value={'Join'} onClick={joinGroup}/>
            </div>
        </div>
    )
}

export default EnterGroup;