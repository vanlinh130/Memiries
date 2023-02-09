import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAfrica, faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Auth.module.scss';
import Input from './Input'
import { signin, signup } from '../../actions/auth';
// import { AUTH } from '../../constants/actionTypes';

const cx = classNames.bind(styles);
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isSignup = false;

  const clientId = "387544023335-7r4dbg893fk5otknebjthiv1n0r2mfad.apps.googleusercontent.com"
  useEffect(() => {
    gapi.load('client:auth2',() => {

      gapi.auth2.init({ clientId: clientId })
    })
  }, [])

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try again later')
  }


  return (
    <div className={cx('main')}>
      <div className={cx('main-paper')}>
        <div className={cx('avatar')}>
          <FontAwesomeIcon  icon={faLock} />
        </div>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>

        <form className={cx('form')} onSubmit={handleSubmit}>

          {/* input */}
          <div className={cx('form-container')}>
              { isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus  />
                  <Input name='lastName' label='Last Name' handleChange={handleChange}  />
                </>
              ) }
              <Input name='email' label='Email Address' handleChange={handleChange} type="email"/>
              <Input name='password' label='Password' handleChange={handleChange} 
                  type={showPassword ? 'text' : 'password'} 
                  handleShowPassword={handleShowPassword}/>

              { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}  type="password" />}
          </div>
            
          {/* button */}
          <button type='submit' className={cx('btn-submit')}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>

          {/* googleLogin */}
          <GoogleLogin 
            clientId={clientId}
            render={(renderProps) => (
              <button 
                className={cx('btn-submit')}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                > <FontAwesomeIcon icon={faGlobeAfrica} /> Google Sign In</button>
            )} 
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <div className={cx('container-footer')}>
            <button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in ' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth