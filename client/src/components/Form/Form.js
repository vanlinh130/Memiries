import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from './Form.module.scss'
import { createPost, updatePost } from "../../actions/posts";

const cx = classNames.bind(styles)

const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''})
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
        if (post) setPostData(post);      
    }, [post] )

    
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <div  className={cx('wrapper')}>
                <h2>Please Sign In to create your own memories and like other's memories.</h2>
            </div>
        )
    }
    
    return (
       <div  className={cx('wrapper')}>
        <form className={cx('form')} onSubmit={handleSubmit}>
            <h3>{currentId ? 'Editing' : 'Creating'} a Memory</h3>
            {/* <input 
                name="creator" 
                placeholder="Creator" 
                value={postData.creator}
                onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/> */}
            <input 
                name="title" 
                placeholder="Tile" 
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
            <input 
                name="message" 
                placeholder="Message" 
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
            <input 
                name="tags" 
                placeholder="Tags" 
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
            
            <div className={cx('file-input')}>
                <FileBase 
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64})}
                />
            </div>

            <button className={cx('btn', 'btn-submit' )} variant='contained' type="submit">Submit</button>
            <button className={cx('btn', 'btn-clear')} variant='contained' type="submit" onClick={clear}>Clear</button>
        </form>
       </div>
    )
}

export default Form;