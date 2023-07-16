import React, { useEffect, useRef, useState } from 'react';

// import testVideo1 from '../testVideo1.mp4';
import testVideo2 from '../testVideo2.mp4';

import NewQuip from './new-quip';
import Quips from './quips';

function Video({video, parent}) {

	const videoRef = useRef(null);
	const [showQuips, setShowQuips] = useState(false);

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
					else if(!document.fullscreenElement) {
						target.muted = 1;
						target.pause();
					}
				}, 200);
			}
		}, observerOpts);

		const ref = videoRef.current;

		videoObserver.observe(ref);

		return () => {
			const root = ref.getRootNode();
			if (root === document) {
				return;
			}
			videoObserver.unobserve(ref);
			ref.pause();
			ref.removeAttribute('src');
			ref.load();
		};
	});

	return (<div className='video' data-show-quips = {showQuips}>
		<div className = "super-video">
			<div className='attribution'>
				<span className='user-avatar-slot'>
					{video.avatar
						? <img src = { video.avatar } />
						: ''
					}
				</span>
				{ video.author.name }
			</div>
		</div>

		<video
			ref = { videoRef }
			controls = { true }
			muted = { true }
			loop = { true }
			preload = "metadata"
			src = { video.file || testVideo2 }
		/>

		<div className = "sub-video">
			<div className = 'caption'>
				<span>
					{ video.description }
				</span>
			</div>

			<div className='quip-drawer'>
				<button className='close' onClick = { () => setShowQuips(false) }></button>
				<Quips video = { video } />
				<NewQuip video = { video } />
			</div>
			<div className = "end-brow"><button className='subtle small' onClick = { () => setShowQuips(true) } >view/add comments</button></div>
		</div>

	</div>);
}

export default Video;
