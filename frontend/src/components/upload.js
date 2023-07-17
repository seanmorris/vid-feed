import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import videoApi from '../api/video';

function Upload() {

	const [errors, setErrors] = useState([]);
	const navigate            = useNavigate();

	const handleError = errors => {
		const _errors = [];
		for (const [field, error] of Object.entries(errors)) {
			const _field = field[0].toUpperCase() + field.slice(1);
			_errors.push(`${_field} ${error}.`);
		}
		setErrors(_errors);
	};

	const submit = event => {
		setErrors([]);
		event.preventDefault();
		const formData = new FormData(event.target);

		videoApi.create(formData)
		.then(video => {
			event.target.reset()
			navigate('/video/' + video.id);
		})
		.catch(handleError);
	};
	return <form onSubmit = { submit }>
		<h2>Upload</h2>
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
		<label>
			<span>File</span>
			<input type = "file" name = "video[file]" />
		</label>
		<label>
			<span>Caption</span>
			<textarea rows = "4" type = "text" name = "video[description]"></textarea>
		</label>
		<label>
			<span></span>
			<input type = "submit" />
		</label>
	</form>;
}

export default Upload;


//
