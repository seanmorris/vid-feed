import React, { useState } from 'react';
import userService from '../service/user';
import userApi from '../api/user';

function EditProfile() {

	const [errors, setErrors] = useState([]);
	const [user, setUser]     = useState();

	const handleError = response => {
		const errors = [];
		for (const [field, error] of Object.entries(response.errors)) {
			const _field = field[0].toUpperCase() + field.slice(1);
			errors.push(`${_field} ${error}.`);
		}
		setErrors(errors);
	};

	if (!user) {
		userService.current().then(u => u && setUser(u));
	}

	const handleSubmit = event => {
		event.preventDefault();

		const formData = new FormData(event.target);

		userApi.update(formData).catch(handleError);
	}

	return (<div className = "edit-profile">
		<h1>Edit Profile</h1>
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
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
