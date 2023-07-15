import React, { useEffect, useRef, useState } from 'react';

import Login from './login';
import Register from './register';

import userService from '../service/user';

function TopBar() {
	const [user,   setUser]   = useState(null);
  const [drawer, setDrawer] = useState(null);

	const r = Math.random();
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

		if (!rootBox || rootBox && rootBox.contains(event.target)) {
			return;
		}

		console.log('Close');
		event.stopImmediatePropagation();

		closeDrawers();

	}, {capture: true});

	return (
		<header ref = { boxRef } className="top-bar" data-drawer = {drawer}>
			<div className = "bar">
				<div className = "logo">LOGO HERE</div>
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
					<li>Home</li>
					<li onClick = { logout } >Logout</li>
				</ul>
			</div>
		</header>
	);
}

export default TopBar;
