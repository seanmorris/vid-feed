import React, { useState } from 'react';
import quipApi from "../api/quip";

export default function NewQuip({video}) {
	const [errors, setErrors]   = useState([]);

	const handleError = response => setErrors([response.error]);

	const submit = event => {
		setErrors([]);
		event.preventDefault();
		quipApi.create(new FormData(event.target))
		.catch(handleError)
	};

	return (
		<form onSubmit = { submit }>
			<ul className = 'errors'>
				{errors.map((e,i) => <li key = {i}>{e}</li>)}
			</ul>
			<label>
				comment:
				<textarea name = "quip[body]" rows = "4"></textarea>
				<input name = "quip[video_id]" type = "hidden" value = {video.id}></input>
			</label>
			<label>
				<input type = "submit" />
			</label>
		</form>
	);
}
