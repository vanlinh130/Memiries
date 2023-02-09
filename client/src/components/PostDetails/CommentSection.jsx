import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { TextField } from '@material-ui/core';

import styles from './PostDetails.module.scss';
import { commentPost } from '../../actions/posts';

const cx = classNames.bind(styles);


const CommentSection = ({ post }) => {
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleComment = async () => {
        const finalComment = `${user.result.name} : ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  return (
    <div>
        <div className={cx('comments-outer')}>
            <div className={cx('comments-inner')}>
                <h4>Comments</h4>
                {comments.map((comment, index) => (
                    <h3 key={index}>
                        <strong>{comment.split(': ')[0]}</strong>
                        {comment.split(': ')[1]}
                    </h3>
                ))}
                <div ref={commentsRef} />
            </div>

            {user?.result?.name && (
                <div style={{ width: '70%'}}>
                    <h4>Write a Comments</h4>
                    <TextField 
                        fullWidth
                        variant='outlined'
                        label='Comments'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <br/>
                    <button disabled={!comment.length} onClick={handleComment}>
                        Comment
                    </button>
                </div>
            )} 
        </div>
    </div>
  )
}

export default CommentSection