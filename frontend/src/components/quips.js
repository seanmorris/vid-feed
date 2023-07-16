import React, { useState, useEffect } from 'react';
import quipApi from "../api/quip";

import Quip from './quip';

export default function Quips({video}) {

	// console.log(video);

	const [quips, setQuips] = useState(false);

	useEffect(() => {
		if (!video.hasComments) {
			video.hasComments = true;
			quipApi.byVideo({video_id: video.id}).then(setQuips);
		}
	});

	return (
		<div className = "quip-list">
			<div className='video-caption'>
				<small>commenting on</small>
				{ video.description }
				</div>
			{quips ? quips.map(q => <Quip quip = {q} />) : ''}
		</div>
	);
}
