import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import styles from './Navbar.module.scss'
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'

const cx = classNames.bind(styles)

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); 

  return (
    <header className={cx('navbar')}>
        <div className={cx('navbar-container')}>
            <Link to='/'>
                <img className={cx('image')}  src={memoriesText} alt="icon"/>
                <img className={cx('image')}  src={memoriesLogo} alt="icon"/>
            </Link>
        </div>

        <div className={cx('toolbar')}>
            {user ? (
                <div className={cx('profile')}>
                    <Avatar className={cx('profile-purple')} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <h2 className={cx('user-name')}>{user.result.name}</h2>
                    <button className={cx('btn', 'btn-logout')} onClick={logout}>Logout</button>
                </div>
            ) : (
                <Link to="/auth" >
                    <button className={cx('btn', 'btn-sign')}>Sign in</button>
                </Link>
            )}
        </div>
    </header> 

  );
}

export default Navbar;
