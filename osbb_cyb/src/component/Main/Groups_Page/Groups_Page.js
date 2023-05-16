import React, {useEffect, useState} from "react";
import s from "./Management_Page.module.scss"
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase-config";
import CreateGroupWindow from "./CreateGroupWindow";
import {useSelector} from "react-redux";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import EnterGroup from "./EnterTheGroup";

const Groups_Page = () => {
    // const navigate = useNavigate();
    //
    // const isAuth = useSelector(state => state.auth.isAuth)
    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate("/profile");
    //     }
    // }, [isAuth])

    const [groups, setgroups] = useState([])

    const [createGroupWindow, setCreateGroupWindow] = useState(false)
    const [enterTheGroup, setEnterTheGroup] = useState(false)

    const [groupKey, setGroupKey] = useState('')
    const [groupID, setGroupID] = useState('')

    const usersCollectionRef = collection(db, "groups")
    const myGroup = useSelector(state => state.auth.group)

    const getGroups = async () => {
        try {
            const data = await getDocs(usersCollectionRef)
            const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
            setgroups(filteredData)
            console.log(filteredData)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getGroups()
    }, [])

    const changeName = () => {
        setCreateGroupWindow(!createGroupWindow)
    }

    const writeKeyBlock = (key, groupID) => {
        setGroupKey(key)
        setGroupID(groupID)

        setEnterTheGroup(!enterTheGroup)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.choose_group}>
                <div className={s.my_group}>
                    <NavLink to={`/groups/${myGroup}/news`}>MY GROUP : {groups.find(group => group.id === myGroup)?.name}</NavLink>
                </div>
                <div className={s.create_group}>
                    <div className={s.create_group_btn} onClick={changeName}>
                        Create new group +
                    </div>
                </div>
            </div>
            <div className={s.join_group}>
                <h2 className={s.title}>ALL GROUPS</h2>
                <div className={s.all_groups}>
                    {groups.map(group => {
                        return <div key={group.id} onClick={() => writeKeyBlock(group.key, group.id)}> {group.name}</div>
                    })}
                </div>
            </div>

            {createGroupWindow
                ? <CreateGroupWindow changeName={changeName} getGroups={getGroups}/>
                : ''
            }
            {enterTheGroup
                ? <EnterGroup groupKey={groupKey} groupID={groupID} writeKeyBlock={writeKeyBlock}/>
                : ''
            }
        </div>
    )
}

export default Groups_Page;