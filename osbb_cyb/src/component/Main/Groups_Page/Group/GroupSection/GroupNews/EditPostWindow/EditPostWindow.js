import s from "./EditPostWindow.module.scss";
import {useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../../../../firebase-config";
import {useSelector} from "react-redux";

const EditPostWindow = ({showEditWindow, editTitle, editInfo, id, postId, getData}) => {
    const allPost = useSelector(state => state.group.news);

    const [titlePost, setTitlePost] = useState(editTitle);
    const [infoPost, setInfoPost] = useState(editInfo);

    const closeOnBg = (event) => {
        if (event.target.className === 'EditPostWindow_createPostWindowPage__LV8IJ') {
            showEditWindow();
        }
    }

    const editPost = () => {
       const sortAllPost = allPost.map(post => {
            if (post.id === postId) {
                return {...post, title: titlePost, info: infoPost}
            }
            return post;
        })

        const newsDocRef = doc(db, 'groups', id);
        updateDoc(newsDocRef, {news: sortAllPost}).then(() => {
            getData();
        })

        showEditWindow();
    }

    return (
        <div className={s.createPostWindowPage} onClick={event => closeOnBg(event)}>
            <div className={s.createPostWindowBlock}>
                <h3 className={s.title}>Create post</h3>
                <form className={s.createPostForm}>
                    <label htmlFor={'titlePost'}>Title</label>
                    <input
                        type={"text"}
                        placeholder={'Title...'}
                        id={'titlePost'}
                        className={s.titlePost}
                        value={titlePost}
                        onChange={event => setTitlePost(event.target.value)}
                    />

                    <label htmlFor={'textPost'}>Info</label>
                    <textarea
                        id={'textPost'}
                        placeholder={'Info...'}
                        onChange={event => setInfoPost(event.target.value)}
                        value={infoPost}
                    ></textarea>

                    <div className={s.addPost} onClick={editPost}> Edit Post</div>

                </form>
            </div>

        </div>
    )
}

export default EditPostWindow;