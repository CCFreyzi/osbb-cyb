import s from "./SwitchRoleWind.module.scss"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../../../../../../../firebase-config";
import {setRole, setUsersFromGroup} from "../../../../../../../../../store/slice/group-slice";

const SwitchRoleWind = ({switchRoles, userId, idAdm}) => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const usersFromGroup = useSelector(state => state.group.users);


    const closeWindow = (event) => {
        if ('SwitchRoleWind_switchRoleWindPage__WgSj5' === event.target.className) {
            switchRoles()
        }
    }

    const switchRole = async () => {
        console.log(usersFromGroup)
        const sortUserFromGroup = usersFromGroup.map(userFromGroup => {
            if (userFromGroup.id === idAdm) {
                // userFromGroup.role = 'member'
                return {...userFromGroup, role: 'member'}
            }
            if (userFromGroup.id === userId) {
                return {...userFromGroup, role: 'adm'}
            }
            return userFromGroup;
        })

        console.log(sortUserFromGroup);
        const userDocRef = doc(db, 'groups', id);
        dispatch(setUsersFromGroup({users: sortUserFromGroup}));
        dispatch(setRole({role: 'member'}));
        await updateDoc(userDocRef, {users: [...sortUserFromGroup]});
        switchRoles();
    }

    return (
        <div className={s.switchRoleWindPage} onClick={closeWindow}>
            <div className={s.switchRoleWindBlock}>
                <div className={s.modalHeader}>
                    <h3>Ви впевнені?</h3>
                </div>
                <div className={s.modalFooter}>
                    <button onClick={switchRole}>Так</button>
                    <button onClick={switchRoles}>Ні</button>
                </div>
            </div>
        </div>
    )

}

export default SwitchRoleWind;