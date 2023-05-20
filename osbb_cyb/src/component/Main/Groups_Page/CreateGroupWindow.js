import s from './Management_Page.module.scss'
import {GiIronCross} from 'react-icons/gi'
import {useEffect, useState} from "react";
import {getDocs, collection, addDoc, setDoc, doc, updateDoc} from "firebase/firestore"
import {db} from "../../../firebase-config";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {setGroup} from "../../../store/slice/auth-slice";


const CreateGroupWindow = ({changeName, getGroups}) => {
    const [groupName, setGroupName] = useState('')
    const [groupKey, setGroupKey] = useState('')

    const dispatch = useDispatch()

    const userId = useSelector(state => state.auth.id)

    const groupsCollectionRef = collection(db, "groups")
    const movieDoc = doc(db, "users", userId)

    // const

    const cancelShowing = (event) => {
        if (event.target.className === 'Management_Page_selectCreatePage__f-D5R') {
            changeName()
        }
    };

    const CreateGroup = async () => {
        try {
            const uuid = uuidv4()
            await setDoc(
                doc(groupsCollectionRef, `${uuid}`),
                {name: groupName, key: groupKey, news: [], users: [{id: userId, role: 'adm'}]}
            ).then(() => {
                getGroups()
                dispatch(setGroup({group: uuid}))
                updateDoc(movieDoc, {group: uuid})

            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={s.selectCreatePage} onClick={event => cancelShowing(event)}>

            <div className={s.selectCreateBlock}>
                <div>
                    <h3 className={s.title_window}>Name</h3>
                    <GiIronCross size={21} className={s.GiIronCross} onClick={changeName}/>
                </div>
                <input type={"text"} className={s.groupName} onChange={event => setGroupName(event.target.value)}
                       placeholder={'Name...'}/>
                <input type={"text"} className={s.groupName} onChange={event => setGroupKey(event.target.value)}
                       placeholder={'Key...'}/>
                <input type={"button"} className={s.groupNameBtn} value={'Create'} onClick={CreateGroup}/>
            </div>
        </div>
    )
}

export default CreateGroupWindow;