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
		.catch(handleError)
	};

	return <form onSubmit = { submit }>
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
		<label>
			<p>Email</p>
			<input type = "text" name = "email" />
		</label>
		<label>
			<p>Password</p>
			<input type = "text" name = "password" />
		</label>
		<label>
			<p></p>
			<input type = "submit" />
		</label>
	</form>;
}

export default Login;
