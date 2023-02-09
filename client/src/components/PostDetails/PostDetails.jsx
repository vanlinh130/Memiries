import React, { useEffect } from 'react'
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, CircularProgress } from '@material-ui/core/';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import styles from './PostDetails.module.scss';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

const cx = classNames.bind(styles);

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  if(!post) return null;

  if(isLoading) {
    return (
      <Paper elevation={6} >
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  }

  return (
    <div className={cx('page')}>
      <div className={cx('page-card')}>
        <div className={cx('page-section')}>
          <h1>{post.title}</h1>
          <h2>{post.tags.map((tag) => `#${tag} `)}</h2>
          <p>{post.message}</p>
          <h3>Create by: {post.name}</h3>
          <p>{moment(post.createdAt).fromNow()}</p>
          <hr/>
          <h4><strong>Realtime Chat - coming soon!</strong></h4>
          <hr/>
          <CommentSection post={post} />
          <hr/>
        </div>
        <div className={cx('page-image-section')}>
          <img className={cx('media-image')} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}  alt={post.title} />
        </div>
      </div>

      {recommendedPosts.length && (
        <div className={cx('section-group')}>
          <h5>You might also like: </h5>
          <hr/>
          <div className={cx('recommended-posts')}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div className={cx('groups')}  onClick={() => openPost(_id)} key={_id}>
                <h4>{title}</h4>
                <p>{name}</p>
                <p>{message}</p>
                <p>Likes: {likes.length}</p>
                <img className={cx('group-image')} src={selectedFile} alt='images' width='200px' />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails