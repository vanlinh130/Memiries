import React from "react";
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Post from "./Post/Post";
import styles from './Posts.module.scss'

const cx = classNames.bind(styles)

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);

    // console.log(posts);
    if (!posts.length && !isLoading) return 'No posts';
    return (
        isLoading ? <div/> : (
            <div className={cx('container')}>
                {posts.map((post) => (
                    <div className={cx('wrapper')} key={post._id}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        )
    )
}

export default Posts;