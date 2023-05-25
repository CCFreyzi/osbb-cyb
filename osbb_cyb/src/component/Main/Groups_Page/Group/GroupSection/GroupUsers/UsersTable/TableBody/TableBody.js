import s from './TableBody.module.scss'
import {DataRenderer, StringRenderer, NumberRenderer} from '../dataRenderer';
import {v4 as uuidv4} from "uuid";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../../../../../../firebase-config";
import {useSelector} from "react-redux";
import {useState} from "react";
import SwitchRoleWind from "./SwitchRoleWind/SwitchRoleWind";


const RENDERS = {
    DATE: DataRenderer,
    STRING: StringRenderer,
    NUMBER: NumberRenderer,
}
const TableBody = ({users, columns, setUsers}) => {

    const [switchRoleWind, setSwitchRoleWind] = useState(false);
    const groupId = useSelector(state => state.auth.group);
    const idAdm = useSelector(state => state.auth.id);
    const role = useSelector(state => state.group.role);
    const [userId, setUserId] = useState('');

    const deleteUser = (userId) => {
        const sortUsers = users.filter(user => user.id !== userId);
        console.log(sortUsers)
        const userDocRef = doc(db, 'groups', groupId);
        const userDoc = doc(db, "users", userId);
        updateDoc(userDoc, {group: ''}).then(() => {
            updateDoc(userDocRef, {users: sortUsers}).then(() => setUsers(sortUsers))
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
                    ?  <><div className={s.deleteMember} onClick={() => deleteUser(user.id)}>Delete member</div>
                        <div className={s.switchRoles} onClick={() => switchRoles(user.id)}>Switch roles</div></>
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