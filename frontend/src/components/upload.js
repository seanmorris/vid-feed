import React, { useState } from 'react';

import videoApi from '../api/video';

function Upload() {

	const [errors, setErrors]   = useState([]);

	// const handleError = response => setErrors([response.error]);

	const submit = event => {
		setErrors([]);
		event.preventDefault();
		const formData = new FormData(event.target);

		videoApi.create(formData);

	};

	return <form onSubmit = { submit }>
		<h2>Upload</h2>
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
		<label>
			<span>File</span>
			<input type = "file" name = "video[file]" />
			{/* <input type = "hidden" name = "video[resource]" value = "fake url here" /> */}
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
