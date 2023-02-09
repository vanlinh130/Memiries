import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Paper, TextField } from '@material-ui/core';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import styles from './Home.module.scss';
import Posts from '../Posts/Posts';
import Form from './../Form/Form';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from './../Pagination';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else{
      navigate("/") 
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <Posts setCurrentId={setCurrentId} />
      </div>
      <div className={cx('sidebar')}>
        <div className={cx('search-bar')}>
          <TextField 
            name='search' 
            variant='outlined' 
            label='Search Memories'
            fullWidth
            onKeyPress={handleKeyPress}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ChipInput
            style={{margin: '10px 0', width: '100%'}}
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label="Search Tags"
            variant='outlined'
          />
          <div className={cx('btn')}>
            <button onClick={searchPost} className={cx('btn-search')}>Search  </button>
              <Link to='/' className={cx('btn-back')}>
                <button className={cx('btn-back')}>
                  <FontAwesomeIcon icon={faBackward} />
                    
                </button>
              </Link>
          </div>
        </div>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        {(!searchQuery && (
          <Paper elevation={6}>
            <Pagination page={page} />
          </Paper>
        ))}
      </div>
    </div>
  )
}

export default Home