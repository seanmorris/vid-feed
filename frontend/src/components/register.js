import React, { useState } from 'react';

import userService from '../service/user';

function Register() {

	const [errors, setErrors]   = useState([]);

	const handleError = response => {
		const errors = [];
		for (const [field, error] of Object.entries(response.errors)) {
			const _field = field[0].toUpperCase() + field.slice(1);
			errors.push(`${_field} ${error}.`);
		}
		setErrors(errors);
	};

	const submit = event => {
		setErrors([]);
		event.preventDefault();
		const formData = new FormData(event.target);

		const email    = formData.get('email');
		const password = formData.get('password');
		const confirm  = formData.get('password_confirmation');
		const name     = formData.get('name');

		userService.register(email, password, confirm, name)
		.catch(handleError)
	};

	return <form onSubmit = { submit }>
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
		<label>
			<p>Display Name</p>
			<input type = "text" name = "name" />
		</label>
		<label>
			<p>Email</p>
			<input type = "text" name = "email" />
		</label>
		<label>
			<p>Password</p>
			<input type = "text" name = "password" />
		</label>
		<label>
			<p>Confirm Password</p>
			<input type = "text" name = "password_confirmation" />
		</label>
		<label>
			<p></p>
			<input type = "submit" />
		</label>
	</form>;
}

export default Register;
