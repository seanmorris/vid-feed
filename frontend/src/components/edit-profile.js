import React, { useState } from 'react';
import userService from '../service/user';
import userApi from '../api/user';

function EditProfile() {

	const [user, setUser] = useState();

	if (!user) {
		userService.current().then(u => u && setUser(u));
	}

	const handleSubmit = event => {
		event.preventDefault();

		const formData = new FormData(event.target);

		userApi.update(formData);
	}

	return (<div className = "edit-profile">
		<h1>Edit Profile</h1>
		{ user
			? <form onSubmit = { handleSubmit } >
				<label>
					Display Name:
					<input name = "user[name]" defaultValue = { user.name } />
				</label>
				<label>
					Avatar:
					<input name = "user[avatar]" type = "file" />
				</label>
				<label>
					Current Password:
					<input name = "user[current_password]" type = "password" />
				</label>
				<label>
					&nbsp;
					<input type = "submit" />
				</label>
			</form>
			: <div></div>
		}
	</div>);
}

export default EditProfile;
