import React, { useState } from 'react';

import userService from '../service/user';

import { useNavigate } from 'react-router-dom';

function Login() {

  const [errors, setErrors] = useState([]);
  const navigate            = useNavigate();


  const handleError = response => setErrors([response.error]);

  const submit = event => {
    setErrors([]);
    event.preventDefault();
    const formData = new FormData(event.target);

    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      const localError = [];
      username || localError.push('Username cannot be blank.');
      password || localError.push('Password cannot be blank.');
      setErrors(localError);
      return;
    }

    userService.signIn(username, password)
    .then(() => {
      setErrors([]);
      console.log(window.PasswordCredential);
      if (window.PasswordCredential) {
        console.log(321);
        var c = new window.PasswordCredential(event.target);
        console.log(c);
        navigator.credentials.store(c).then(console.log);
      }
      event.target.reset();
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
      <input type = "text" name = "username" autoComplete = "username email" />
    </label>
    <label>
      <span>Password</span>
      <input type = "password" name = "password" autoComplete = "current-password" />
    </label>
    <label>
      <input type = "submit" />
    </label>
  </form>;
}

export default Login;
