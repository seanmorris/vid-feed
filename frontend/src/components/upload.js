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
		<ul className = 'errors'>
			{errors.map((e,i) => <li key = {i}>{e}</li>)}
		</ul>
		<label>
			<p>File</p>
			<input type = "file" name = "video[file]" />
			{/* <input type = "hidden" name = "video[resource]" value = "fake url here" /> */}
		</label>
		<label>
			<p>Caption</p>
			<textarea type = "text" name = "video[description]"></textarea>
		</label>
		<label>
			<p></p>
			<input type = "submit" />
		</label>
	</form>;
}

export default Upload;


//
