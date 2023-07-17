import React, { useState, useRef, useEffect } from 'react';
import videoApi from '../api/video';
import { Link } from 'react-router-dom';

export default function VideoList({userId}) {
	const [videos, setVideos] = useState(false);
	const [page, setPage]     = useState(1);
	const pageRef             = useRef(0);
	const doneRef             = useRef(false);

	useEffect(() => {
		if (page !== pageRef.current) {
			videoApi.byUser({user_id: userId, page}).then(videos => {
				if (videos.length) {
					setVideos(videos)
					pageRef.current = page;
					doneRef.current = false;
				}
				else {
					setPage(page - 1)
					doneRef.current = true;
				}
			});
		}
	});
	return (<div>
		<div className='video-list'>
		{videos
			? videos.map(v => <div key = {v.id} className = "video-list-item">
				<Link to = { '/video/' + v.id }>
					<video
						controls = { false }
						muted = { true }
						loop = { false }
						preload = "metadata"
						src = { v.file }
						/>
				</Link>
			</div>)
			: ''
		}
		</div>
		<div className='page-buttons'>
			<button onClick={ () => setPage(Math.max(1, page - 1)) } disabled = { page <= 1 }>prev</button>
			<button onClick={ () => setPage(page + 1) } disabled = {doneRef.current || videos.length < 12} >next</button>
		</div>
	</div>);
}
