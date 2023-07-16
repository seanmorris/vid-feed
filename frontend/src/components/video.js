import React, { useEffect, useRef, createRef, useState } from 'react';

import testVideo1 from '../testVideo1.mp4';
import testVideo2 from '../testVideo2.mp4';

function Video({video, parent}) {

	const videoRef = useRef(null);

	useEffect(() => {
		const observerOpts  = {root: parent.current, threshold: 1};
		const videoObserver = new IntersectionObserver(observations => {
			for (const observation of observations) {
				const target = observation.target;
				const active = observation.isIntersecting;

				setTimeout(() => {
					if (active) {
						target.muted = 0;
						target.play().catch(console.warn);
					}
					else {
						target.muted = 1;
						target.pause();
					}
				}, 200);
			}
		}, observerOpts);

		const ref = videoRef.current;

		videoObserver.observe(ref);

		return () => videoObserver.unobserve(ref);
	});

	return (<div className='video'>
		<video
			ref = { videoRef }
			controls = { true } muted = { true } loop = { true }
			preload = "metadata"
			src = { video.file || testVideo2 }
		/>
		<div className = "sub-video">
			<div className = 'caption'>
				<span>
					{ video.description }
				</span>
			</div>
			<div className='attribution'>
				<span className='icon user-icon'></span>
				{ video.author.name }
			</div>
		</div>
	</div>);
}

export default Video;
