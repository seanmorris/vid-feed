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

		userService.signIn(email, password)
		.then(() => event.target.reset())
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
			<input type = "text" name = "password" />
		</label>
		<label>
			<input type = "submit" />
		</label>
	</form>;
}

export default Login;
