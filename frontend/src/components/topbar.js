import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import Login from './login';
import Register from './register';

import userService from '../service/user';

function TopBar() {
	const [user,   setUser]   = useState(null);
  const [drawer, setDrawer] = useState(null);

	let rootBox = null;

	let boxRef = useRef(false);

	useEffect(() => { rootBox = rootBox || boxRef.current }, [boxRef]);

	const closeDrawers = event => setDrawer(null);
	const openSignup   = event => setDrawer('sign-up');
	const openLogin    = event => setDrawer('log-in');
	const openMenu     = event => setDrawer('menu');

  document.addEventListener('user-logged-in', event => {
		setUser(event.detail);
		closeDrawers();
	});

	const logout = () => {
		userService.signOut();
		closeDrawers();
		setUser(null);
	}

	document.addEventListener('user-logged-out', event => setUser(false));

	document.addEventListener('click', event => {

		if (!rootBox || (rootBox && rootBox.contains(event.target))) {
			return;
		}

		closeDrawers();

	}, {capture: true});

	return (
		<header ref = { boxRef } className="top-bar" data-drawer = {drawer}>
			<div className = "bar">
				<div className = "logo">
				<Link to='/'>LOGO</Link>
				</div>
				<div className = "spacer"></div>
				<div className = "links">
					{ user
							? <span onClick = {openMenu}>
									<span className='icon user-icon'></span>
									{ user.name }
								</span>
							: <span>
									<a onClick = {openSignup}>Sign up</a>
									<a onClick = {openLogin}>Log in</a>
								</span>
					}
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
