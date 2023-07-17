import React, { useState } from 'react';

import userService from '../service/user';

function Login() {

	const [errors, setErrors]   = useState([]);

	const handleError = response => setErrors([response.error]);

	const submit = event => {
		setErrors([]);
		event.preventDefault();
		const formData = new FormData(event.target);

		const email    = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			const localError = [];
			email || localError.push('Email cannot be blank.');
			password || localError.push('Password cannot be blank.');
			setErrors(localError);
			return;
		}

		userService.signIn(email, password)
		.then(() => {
			setErrors([]);
			event.target.reset()
		})
		.catch(handleError)
	};

	return <form onSubmit = { submit }>
		<h2>Login</h2>
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
		<label>
			<span>Email</span>
			<input type = "text" name = "email" />
		</label>
		<label>
			<span>Password</span>
			<input type = "password" name = "password" />
		</label>
		<label>
			<input type = "submit" />
		</label>
	</form>;
}

export default Login;
