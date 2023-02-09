import React, { useState } from "react";
import classNames from 'classnames/bind';
import moment from 'moment';
import { CardMedia } from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Post.module.scss'
import { deletePost, likePost } from "../../../actions/posts";

const cx = classNames.bind(styles)

const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);

    const userId = (user?.result.googleId || user?.result?._id);
    const hasLikePost = post?.likes?.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikePost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([ ...post.likes, userId])
        }
    }

    const Likes = () => {
        if (post?.likes?.length > 0) {
          return post.likes.find((like) => like === userId)
            ? (
              <><FontAwesomeIcon icon={faThumbsUp} />&nbsp;{likes.length > 2 ? `You & ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><FontAwesomeIcon icon={faThumbsDown} />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FontAwesomeIcon icon={faThumbsDown} />&nbsp;Like</>;
    }; 

    const openPost = (e) => {
        navigate(`/posts/${post._id}`)
    }

    return (
        <div className={cx('card')}>
            
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={cx('overlay2')}>
                        <button onClick={() => setCurrentId(post._id)}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </div>
                )}
            <div className={cx('base')} onClick={openPost}>
                <CardMedia className={cx('images')} image={post.selectedFile} title={post.title} />
                <div className={cx('overlay')}>
                    <h3>{post.name}</h3>
                    <p>{moment(post.createdAt).fromNow()}</p>
                </div>


                <div className={cx('details')}>
                    <div className={cx('title')}>
                        <p>{post.tags.map((tag) => `#${tag} `)}</p>
                    </div>
                    <h2>{post.title}</h2>
                    <h4>{post.message}</h4>
                </div>
            </div>

            <div className={cx('details')}>
                <div className={cx('card-actions')}>
                    <button className={cx('btn-link')} size="small" 
                        disabled={!user?.result} 
                        onClick={handleLike}> 
                        <Likes/>
                    </button>
                        
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <button className={cx('btn-delete')} size="small" 
                            onClick={() => dispatch(deletePost(post._id))}> 
                            <FontAwesomeIcon icon={faTrash} /> Delete</button>
                    )}
                </div>
            </div>
            

        </div>
    )
}

export default Post;