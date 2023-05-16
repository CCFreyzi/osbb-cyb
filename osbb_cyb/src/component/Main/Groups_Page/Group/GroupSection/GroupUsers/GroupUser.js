import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import GroupNavbar from "../../GroupNavbar";
import s from './GroupUser.module.scss'
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../../../../firebase-config";
import {setAnotherData, setGroup} from "../../../../../../store/slice/auth-slice";
import {v4 as uuidv4} from "uuid";
import TableHead from "./UsersTable/TableHead/TableHead";
import TableBody from "./UsersTable/TableBody/TableBody";

const GroupUser = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);


    const getColumn = useSelector(state => state.group.columns)
    const usersWithGroup = useSelector(state => state.group.users)
    useEffect(() => {
        setColumns(getColumn)
        for (let user of usersWithGroup) {
            const userDocRef = doc(db, 'users', user.id);
            getDoc(userDocRef)
                .then((doc) => {
                    // console.log(doc.data())
                    const fullInf = {...doc.data(), role: user.role}
                    setUsers(prevUsers => [...prevUsers, fullInf])
                })
        }
    }, [])
    // console.log(users)
    // console.log(columns)
    return (
        <div className={s.groupUsersPage}>
            <GroupNavbar/>
            <div className={s.listUsers}>
                <TableHead columns={columns}/>
                <TableBody columns={columns} users={users}/>
            </div>
        </div>
    )
}

export default GroupUser;