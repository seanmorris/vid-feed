import React, { useState, useRef, useEffect } from 'react';
import quipApi from "../api/quip";

import Quip from './quip';

export default function Quips({video}) {

	const [quips, setQuips] = useState(false);
	const listRef = useRef(null);

	const loadList = () => quipApi.byVideo({video_id: video.id}).then(setQuips);

	useEffect(() => {
		if (!video.hasComments) {
			video.hasComments = true;
			loadList();
		}

		listRef.current.scrollTo({
			behavior: 'auto',
			top: listRef.current.scrollHeight,
		});

		const handleNewQuip = event => {
			if (event.detail.video !== video) {
				return;
			}

			loadList().then(() => {
				if (listRef.current) {
					console.log(listRef.current);
					listRef.current.scrollTo({
						behavior: 'smooth',
						top: listRef.current.scrollHeight,
					});
				}
			});
		};

		document.addEventListener('newQuip', handleNewQuip);

		return () => {
			document.removeEventListener('newQuip', handleNewQuip);
		};
	});

	return (
		<div className = "quip-list" ref = { listRef }>
			<div className='video-caption'>
				<small>commenting on</small>
				{ video.description }
				</div>
			{quips ? quips.map(q => <Quip quip = {q} key = { q.id } ></Quip>) : ''}
		</div>
	);
}
