import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import Login from './login';
import Register from './register';

import userService from '../service/user';

import '../hamburger.css';

let menuOpen = false;

function TopBar() {

  const [drawer, setDrawer] = useState(null);
  const [menu,   setMenu]   = useState(menuOpen);
	const [user,   setUser]   = useState(null);

	let rootBox = null;

	const closeDrawers = event => setDrawer(null);
	const openSignup   = event => setDrawer('sign-up');
	const openLogin    = event => setDrawer('log-in');
	const openMenu     = event => setDrawer('menu');

	const userLoggedIn = event => {
		setUser(event.detail);
		closeDrawers();
	};


	const logout = () => {
		userService.signOut();
		closeDrawers();
		setUser(null);
	}

	const userLoggedOut = event => setUser(false);

	const userClickedOutside = event => {

		if (!rootBox || (rootBox && rootBox.contains(event.target))) {
			return;
		}

		closeDrawers();
	};

	const userAttemptedAction = event => {
		if (!userService.signedIn) {
			event.preventDefault();
			openLogin();
		}
	};

	const clickedOpts = {capture: true};

	let boxRef = useRef(false);

	useEffect(() => {
		rootBox = rootBox || boxRef.current

		document.addEventListener('user-logged-in', userLoggedIn);
		document.addEventListener('user-logged-out', userLoggedOut);
		document.addEventListener('click', userClickedOutside, clickedOpts);
		document.addEventListener('uploadClicked', userAttemptedAction);
		document.addEventListener('submitCommentClicked', userAttemptedAction);

		return () => {
			document.removeEventListener('user-logged-in', userLoggedIn);
			document.removeEventListener('user-logged-out', userLoggedOut);
			document.removeEventListener('click', userClickedOutside, clickedOpts);
			document.removeEventListener('uploadClicked', userAttemptedAction);
			document.removeEventListener('submitCommentClicked', userAttemptedAction);
		}

	}, [boxRef]);

	const toggleMenu = () => {
		menuOpen = !menuOpen;
		setMenu(menuOpen);
	};

	return (
		<header ref = { boxRef } className="top-bar" data-drawer = {drawer}>

			<div className = "bar">
				<div className = "logo">
					<Link to='/'>
						<span className = "logo-glyph"></span>
						<span className = "logo-text">VidFeed</span>
					</Link>
				</div>
				<div className = "spacer"></div>
				<div className = "links">
					{ user
							? <span onClick = {openMenu}>
									<span className='icon user-icon'></span>
									{ user.name }
								</span>
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

			<div className = "drawer login"><Login /></div>
			<div className = "drawer register"><Register /></div>

			<div className = "drawer menu">
				<ul>
					<li onClick = { logout } >Logout</li>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/me'>My Profile</Link></li>
					<li><Link to='/edit-profile'>Edit Profile</Link></li>
				</ul>
			</div>
		</header>
	);
}

export default TopBar;
