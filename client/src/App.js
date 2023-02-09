import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './styles.module.scss'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const cx = classNames.bind(styles)

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
  <Router>
    <div className={cx('wrapper')}>
      <Navbar />
      <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />}></Route>
          <Route path="/posts" element={<Home/>}></Route>
          <Route path="/posts/search" element={<Home/>}></Route>
          <Route path="/posts/:id" element={<PostDetails/>}></Route>
          <Route path="/auth" element={!user ? <Auth/> : <Navigate to="/posts" />}></Route>
      </Routes>
    </div>
  </Router>

  );
}

export default App;
