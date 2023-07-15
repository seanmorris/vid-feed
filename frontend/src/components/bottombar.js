import React, { useState } from 'react';

import Upload from './upload';

function BottomBar() {

	const [drawer, setDrawer] = useState(null);

	const closeUpload = () => setDrawer(null);
	const openUpload  = () => setDrawer('upload', 1);

	return (
		<div className = 'bottom-bar' data-drawer = { drawer }>
			<div className = "bar">
				<a onClick = { openUpload }>+</a>
			</div>

			<div className='drawer upload-drawer'>
				<button onClick = { closeUpload } className='close'></button>
				<Upload />
			</div>

		</div>
	);
}

export default BottomBar;
