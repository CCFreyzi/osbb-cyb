import GroupNavbar from "../../GroupNavbar";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../../../firebase-config";
import {setGroupData, setNewsFromGroup, setRole} from "../../../../../../store/slice/group-slice";
import s from './GroupNews.module.scss'
import CreatePostWindow from "./CreatePostWindow";
import {v4 as uuidv4} from "uuid";
import EditPostWindow from "./EditPostWindow/EditPostWindow";

const GroupNews = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const userId = useSelector(state => state.auth.id);
    const userRole = useSelector(state => state.group.role);

    const [news, setNews] = useState([])
    const [showCreatePostWindow, setShowCreatePostWindow] = useState(false);
    const [showEditPostWindow, setShowEditPostWindow] = useState(false);

    const [editTitle, setEditTitle] = useState('');
    const [editInfo, setEditInfo] = useState('');
    const [postId, setPostId] = useState('');


    const showWindow = () => {
        setShowCreatePostWindow(!showCreatePostWindow)
    }
    const showEditWindow = (postTitle, postInfo, postId) => {
        setEditTitle(postTitle)
        setEditInfo(postInfo)
        setPostId(postId)
        setShowEditPostWindow(!showEditPostWindow)
    }

    const getData = () => {
        const userDocRef = doc(db, 'groups', id);
        getDoc(userDocRef)
            .then((doc) => {
                // const name = doc.data().name;
                // const key = doc.data().key;
                const users = doc.data().users;
                const news = doc.data()?.news;

                for (let user of users) {
                    if (user.id === userId) {
                        dispatch(setRole({role: user.role}));
                    }
                }
                // dispatch(setGroupData({name, key, users, news}));
                dispatch(setNewsFromGroup({news: news}))
                setNews(news);
            })
            .catch((error) => {
                console.log("Помилка отримання данних групи:", error);
            });
    }

    const deletePost = (postId) => {
        const sortNews = news.filter(nw => nw.id !== postId);

        const newsDocRef = doc(db, 'groups', id);
        getDoc(newsDocRef)
            .then(() => {
                const uuid = uuidv4()
                updateDoc(newsDocRef, {news: [...sortNews]});
            }).then(() => {
            getData();
        })
            .catch((error) => {
                console.log("Помилка отримання данних групи:", error);
            });

    }

    useEffect(() => {
        userId && getData();
    }, [userId]);

    return (
        <div className={s.groupNewsPage}>
            <GroupNavbar/>
            <div className={s.posts}>
                {userRole === 'adm'
                    ? <div className={s.addPost} onClick={showWindow}> Add Post</div>
                    : ''
                }
                {news?.map(post => {
                    return <div key={post.id} className={s.post}>
                        <h3 className={s.card_title}>{post.title}</h3>
                        <div className={s.card_info}>{post.info}</div>
                        <div className={s.dateAndBtn}>
                            <div className={s.card_date}><b>Date of
                                creation:</b> {new Date(post.createDate).getDate()} / {new Date(post.createDate).getMonth() + 1} / {new Date(post.createDate).getFullYear() + ";"} {}<b>Time</b> {new Date(post.createDate).getHours()}:{new Date(post.createDate).getMinutes() + ";"}
                            </div>
                            {userRole === 'adm'
                                ? <div className={s.btn_block}>
                                    <div className={s.delete_btn} onClick={() => showEditWindow(post.title, post.info, post.id)}>
                                        <span className={s.shadow}></span>
                                        <span className={s.edge + ' ' + s.edit_edge}></span>
                                        <span className={s.front + ' ' + s.edit_front}>Edit post</span>
                                    </div>
                                    <div className={s.delete_btn} onClick={() => deletePost(post.id)}>
                                        <span className={s.shadow}></span>
                                        <span className={s.edge}></span>
                                        <span className={s.front}>Delete post</span>
                                    </div>
                                </div>
                                : ''
                            }

                        </div>
                    </div>
                })}
            </div>

            {showCreatePostWindow
                ? <CreatePostWindow showWindow={showWindow} getData={getData} id={id}/>
                : ''
            }
            {showEditPostWindow
                ? <EditPostWindow showEditWindow={showEditWindow} editTitle={editTitle} editInfo={editInfo} postId={postId} getData={getData} id={id}/>
                : ''
            }

        </div>
    )
}

export default GroupNews;