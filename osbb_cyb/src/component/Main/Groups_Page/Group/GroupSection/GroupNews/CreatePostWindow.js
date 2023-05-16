import s from './CreatePostWindow.module.scss'
import {useState} from "react";
import {useSelector} from "react-redux";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../../../firebase-config";
import {setGroup} from "../../../../../../store/slice/auth-slice";
import {v4 as uuidv4} from "uuid";

const CreatePostWindow = ({showWindow, getData, id}) => {

    const [titlePost, setTitlePost] = useState('');
    const [infoPost, setInfoPost] = useState('');

    const allNews = useSelector(state => state.group?.news);

    const closeOnBg = (event) => {
        if (event.target.className === 'CreatePostWindow_createPostWindowPage__G8qeF') {
            showWindow();
        }
    }

    const createPost = () => {
        const newsDocRef = doc(db, 'groups', id);
        const now = new Date
        const date = now.getTime()
        getDoc(newsDocRef)
            .then(() => {
                const uuid = uuidv4()
                updateDoc(newsDocRef, {news: [...allNews, {info: infoPost, title: titlePost, id: uuid, createDate: date}]});
            }).then(() => {
            showWindow();
            getData();
        })

            .catch((error) => {
                console.log("Помилка отримання данних групи:", error);
            });
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
                        onChange={event => setTitlePost(event.target.value)}
                    />

                    <label htmlFor={'textPost'}>Info</label>
                    <textarea
                        id={'textPost'}
                        placeholder={'Info...'}
                        onChange={event => setInfoPost(event.target.value)}
                    ></textarea>

                    <div className={s.addPost} onClick={createPost}> Add Post</div>

                </form>
            </div>

        </div>
    )
}

export default CreatePostWindow;
