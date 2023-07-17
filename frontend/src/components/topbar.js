import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './login';
import Register from './register';

import userService from '../service/user';

import '../hamburger.css';


let menuOpen = false;

function TopBar() {

  const [drawer, setDrawer] = useState(null);
  const [menu,   setMenu]   = useState(menuOpen);
  const [user,   setUser]   = useState(null);
  const navigate = useNavigate();

  let rootBox = null;

  const closeDrawers = event => { setDrawer(null) };
  const openSignup   = event => { setMenu(menuOpen = false); setDrawer('sign-up') };
  const openLogin    = event => { setMenu(menuOpen = false); setDrawer('log-in') };
  const openMenu     = event => { setDrawer('menu') };

  const userLoggedIn = event => {
    userService.current().then(u => setUser(u));
    closeDrawers();
  };

  const logout = () => {
    userService.signOut().then(() => {
      navigate('/');
      closeDrawers();
      setUser(null);
      window.location.reload();
    });
  };

  const userLoggedOut = event => setUser(false);

  const userClickedOutside = event => {

    if (!rootBox || (rootBox && rootBox.contains(event.target))) {
      return;
    }
    closeDrawers();
    setMenu(false);
    menuOpen = false;
  };

  const userAttemptedAction = event => {
    if (!userService.signedIn) {
      event.preventDefault();
      openLogin();
    }
  };

  const clickedOpts = {capture: true};

  let boxRef = useRef(false);

  const updateUser = event => setUser(event.detail);
  const closeMenu = () => setMenu(menuOpen = false);

  useEffect(() => {
    rootBox = rootBox || boxRef.current

    document.addEventListener('user-logged-in', userLoggedIn);
    document.addEventListener('user-logged-out', userLoggedOut);
    document.addEventListener('click', userClickedOutside, clickedOpts);
    document.addEventListener('uploadClicked', userAttemptedAction);
    document.addEventListener('profileClicked', userAttemptedAction);
    document.addEventListener('submitCommentClicked', userAttemptedAction);
    document.addEventListener('userUpdated', updateUser);
    window.addEventListener('popstate', closeMenu);

    return () => {
      document.removeEventListener('user-logged-in', userLoggedIn);
      document.removeEventListener('user-logged-out', userLoggedOut);
      document.removeEventListener('click', userClickedOutside, clickedOpts);
      document.removeEventListener('uploadClicked', userAttemptedAction);
      document.removeEventListener('profileClicked', userAttemptedAction);
      document.removeEventListener('submitCommentClicked', userAttemptedAction);
      document.removeEventListener('userUpdated', updateUser);
      window.removeEventListener('popstate', closeMenu);
    }

  }, [boxRef]);

  const location = useLocation();
    useEffect(() => {
      setMenu(menuOpen = false);
  }, [location]);

  const toggleMenu = () => {
    menuOpen = !menuOpen;
    closeDrawers();
    setMenu(menuOpen);
  };

  return (
    <header ref = { boxRef } className="top-bar" data-drawer = {drawer}>

      <div className = "bar">
        <div className = "logo">
          <Link to='/videos'>
            <span className = "logo-glyph"></span>
            <span className = "logo-text">VidFeed</span>
          </Link>
        </div>
        <div className = "spacer"></div>
        <div className = "links">
          { user
              ? <Link to = "/me" className = "user-name subtle">
                  { user.name }
                  &nbsp;
                  <span className='user-avatar-slot'>
                    {user.pic
                      ? <img src = { user.pic } />
                      : ''
                    }
                  </span>
                </Link>
              : <span>
                  <a onClick = {openLogin}>Log in</a>
                  <a className='cta' onClick = {openSignup}>Sign up</a>
                </span>
          }
        </div>
        <div className = "hamburger-button" data-open = { menu } onClick = {toggleMenu} >
          <div className = "burger-bar"></div>
          <div className = "burger-bar"></div>
          <div className = "burger-bar"></div>
        </div>
      </div>

      <div className = "drawer login">
        <Login />
      </div>

      <div className = "drawer register">
        <Register />
      </div>

      <div className = "flyin-menu menu">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/videos'>Videos</Link></li>
          {user
            ? <span>
                <li><Link to='/me'>My Profile</Link></li>
                <li><Link to='/edit-profile'>Edit Profile</Link></li>
                <li><a onClick = { logout } >Logout</a></li>
              </span>
            : ''
          }
        </ul>
      </div>
    </header>
  );
}

export default TopBar;
