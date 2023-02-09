import React, { useEffect} from 'react';
import classNames from 'classnames/bind';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Pagination.module.scss';
import { getPosts } from '../actions/posts';

const cx = classNames.bind(styles);

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [ page ]);


  return (
    <Pagination 
      className={cx('pagination')}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate