import React, { useEffect, useState, useRef } from 'react';
import userService from '../service/user';
import userApi from '../api/user';

import videoApi from '../api/video';

import VideoList from './video-list';

import { useParams } from 'react-router-dom';

function Profile() {
	const { userId } = useParams();
	const [user, setUser] = useState();
	const userRef = useRef();

	useEffect(() => {
		if (!userId) {
			if (!user || userRef.current !== user) {
				userService.current().then(loaded => {
					if (!loaded) {
						return;
					}

					setUser(loaded);

					userRef.current = loaded;
				});
			}
		}
		else {
			if (!user || userRef.current !== user) {
				userApi.read(userId).then(loaded => {
					if (!loaded) {
						return;
					}

					setUser(loaded);

					userRef.current = loaded;
				});
			}
		}
	});

	return (<div className = "profile">
		{ user
			? <div>
					<h1>{ user.pic ? <img className='avatar' src = {user.pic} /> : '' } { user.name }</h1>
					<VideoList userId = { user.id } />
				</div>
			: <div></div>
		}
	</div>);
}

export default Profile;
