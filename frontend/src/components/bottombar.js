import React, { useState, useEffect } from 'react';

import Upload from './upload';

function BottomBar() {

	const [drawer, setDrawer] = useState(null);

	const closeUpload = () => setDrawer(null);
	const openUpload  = () => {

		const event = new CustomEvent('uploadClicked', {cancelable:true})

		if (document.dispatchEvent(event)) {
			setDrawer('upload', 1);
		}
	};

	const userLoggedOut = event => {
		closeUpload();
	};

	useEffect(() => {
		document.addEventListener('user-logged-out', userLoggedOut);
		return () => {
			document.removeEventListener('user-logged-out', userLoggedOut);
		};
	});

	return (
		<div className = 'bottom-bar' data-drawer = { drawer }>
			<div className = "bar">
				<button className='bubble cta upload' onClick = { openUpload }></button>
			</div>

			<div className='drawer upload-drawer'>
				<button onClick = { closeUpload } className='close'></button>
				<Upload />
			</div>

		</div>
	);
}

export default BottomBar;
