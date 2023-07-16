import React, { useState } from 'react';
import userService from '../service/user';

function Profile() {

	const [user, setUser] = useState();

	if (!user) {
		userService.current().then(u => u && setUser(u));
	}

	return (<div className = "profile">
		{ user
			? <div>
				<h1>{ user.pic ? <img className='avatar' src = {user.pic} /> : '' } { user.name }</h1>
				</div>
			: <div></div>
		}
	</div>);
}

export default Profile;
