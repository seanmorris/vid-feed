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
    userService.register(new FormData(event.target))
    .then(() => event.target.reset())
    .catch(handleError)
  };

  return <form onSubmit = { submit }>
    <h2>Sign up</h2>
    <ul className = 'errors'>
      {errors.map((e,i) => <li key = {i}>{e}</li>)}
    </ul>
    <label>
      <span>Display Name</span>
      <input type = "text" name = "user[name]" />
    </label>
    <label>
      <span>Avatar</span>
      <input type = "file" name = "user[avatar]" />
    </label>
    <label>
      <span>Email</span>
      <input type = "text" name = "user[email]" accept="image/*" />
    </label>
    <label>
      <span>Password</span>
      <input type = "password" name = "user[password]" />
    </label>
    <label>
      <span>Confirm Password</span>
      <input type = "password" name = "user[password_confirmation]" />
    </label>
    <label>
      <input type = "submit" />
    </label>
  </form>;
}

export default Register;
