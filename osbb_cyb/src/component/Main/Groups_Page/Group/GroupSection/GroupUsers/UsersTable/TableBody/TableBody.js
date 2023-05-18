import s from './TableBody.module.scss'
import {DataRenderer, StringRenderer, NumberRenderer} from '../dataRenderer';
import {v4 as uuidv4} from "uuid";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../../../../../firebase-config";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../../../../../../../../store/slice/group-slice";
import {useEffect, useState} from "react";
import SwitchRoleWind from "./SwitchRoleWind/SwitchRoleWind";


const RENDERS = {
    DATE: DataRenderer,
    STRING: StringRenderer,
    NUMBER: NumberRenderer,
}
const TableBody = ({users, columns}) => {
    const  [switchRoleWind, setSwitchRoleWind] = useState(false)
    const groupId = useSelector(state => state.auth.group);
    const userFromGroup = useSelector(state => state.group.users);
    const idAdm = useSelector(state => state.auth.id);
    const role = useSelector(state => state.group.role);
    const [userId, setUserId] = useState('')



    const deleteUser = (userId) => {
        const sortUsers = userFromGroup.filter(user => user.id !== userId);
        console.log(sortUsers)
        const userDocRef = doc(db, 'groups', groupId);
        const userDoc = doc(db, "users", userId);
        updateDoc(userDoc, {group: ''}).then(() => {
            updateDoc(userDocRef, {users: [...sortUsers]}).then(() => {
                // dispatch(setUsersFromGroup())
            })
        })
    }

    const switchRoles = (userId) => {
        setUserId(userId)
        setSwitchRoleWind(!switchRoleWind)

    }
    return <div className={s.table_body}>
        {users.map(user => {
            const uuid = uuidv4()
            return <div className={s.tableText} key={uuid}>
                {columns.filter(({isShow}) => isShow).map(column => {
                    const Renderer = RENDERS[column.type];
                    return <Renderer key={column.id} data={user[column.value]}/>
                })}

                {role === 'adm' && user.id !== idAdm
                    ?  <><button className={s.deleteMember} onClick={() => deleteUser(user.id)}>Delete member</button>
                        <button className={s.switchRoles} onClick={() => switchRoles(user.id)}>Switch roles</button></>
                    : ''
                }
                {switchRoleWind
                    ? <SwitchRoleWind switchRoles={switchRoles} userId={userId} idAdm={idAdm}/>
                    : ''
                }

            </div>
        })}


    </div>
}

export default TableBody;