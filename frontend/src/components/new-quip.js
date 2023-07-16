import React, { useState } from 'react';
import quipApi from "../api/quip";

export default function NewQuip({video}) {
	const [errors, setErrors]   = useState([]);

	const handleError = errors => {
		const _errors = [];
		for (const [field, error] of Object.entries(errors)) {
			const _field = field[0].toUpperCase() + field.slice(1);
			_errors.push(`${_field} ${error}.`);
		}
		setErrors(_errors);
	};

	const submit = event => {
		event.preventDefault();

		if (!document.dispatchEvent(new CustomEvent('submitCommentClicked', {cancelable:true}))) {
			return;
		}

		setErrors([]);
		quipApi.create(new FormData(event.target))
		.then(quip => {
			document.dispatchEvent(new CustomEvent('newQuip', {detail:{quip,video}}));
			event.target.reset();
		})
		.catch(handleError);
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
