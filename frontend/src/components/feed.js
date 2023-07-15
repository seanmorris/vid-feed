import React, { useEffect, useRef, createRef, useState } from 'react';

import videoApi   from '../api/video';
import testVideo1 from '../testVideo1.mp4';
import testVideo2 from '../testVideo2.mp4';

const delay = d => new Promise(a => setTimeout(a, d));

let
	currentPage = 1,
	videoList = [],
	getVideos,
	scrollBox,
	topLoader,
	bottomLoader;

function Feed() {
	const monitor = {refreshing: false};

	const [refreshing, setRefreshing] = useState(false);
	const [videos, setVideos] = useState([]);
	const [page, setPage] = useState(currentPage);

	getVideos = getVideos || videoApi.list();

	const loadFeed = (page = 0) => {

		if (page === -1) {
			getVideos = videoApi.list({page});
		}

		if (page <= 1) {
			getVideos.then(v => {
				videoList = v;
				setVideos(v)
			});
		}
		else {
			getVideos = videoApi.list({page});
			getVideos.then(v => {
				videoList = [...videoList, ...v]
				setVideos(videoList)
			});
		}

		return getVideos;
	};

	if (!videoList.length) {
		loadFeed(0);
	}

	const scrollBoxRef    = useRef(false);
	const topLoaderRef    = useRef(false);
	const bottomLoaderRef = useRef(false);

	const observerOpts = {root: scrollBox, threshold: 1};

	const topObserver = new IntersectionObserver(observation => {
		if (monitor.refreshing) {
			return;
		}

		currentPage = 1;
		monitor.refreshing = true;

		setVideos([]);
		setPage(currentPage);
		setRefreshing(true);

		Promise.all([ loadFeed(-1), delay(500 )])
		.then(() => {
			scrollBox.focus();
			monitor.refreshing = false;
			setRefreshing(false);
		});

	}, observerOpts);

	const bottomObserver = new IntersectionObserver(() => {

		if (!videoList.length) {
			return;
		}

		if (monitor.refreshing) {
			return;
		}

		currentPage++
		monitor.refreshing = true;

		setPage(currentPage);
		setRefreshing(true);

		Promise.all([ loadFeed(currentPage), delay(500) ])
		.then(() => {
			scrollBox.focus();
			monitor.refreshing = false;
			setRefreshing(false);
		});

	}, observerOpts);

	const videoObserver = new IntersectionObserver(observations => {

		for (const observation of observations) {
			const target = observation.target;
			const ratio  = observation.intersectionRatio;

			setTimeout(() => {
				if (observation.isIntersecting) {
					target.play().catch(console.warn);
				}
				else {
					target.pause();
				}
			}, 200);
		}

	}, observerOpts);

	const videoRefs = useRef({});

	// console.log(videoList);

	videoList.forEach(v => {
		if(!v) return;
		videoRefs.current[v.id] = videoRefs.current[v.id] ?? createRef()
	});

	for (const videoRef of Object.values(videoRefs.current)) {
		videoRef.current && videoObserver.observe(videoRef.current);
	}

	useEffect(() => {
		if (bottomLoader !== scrollBoxRef.current) {
			scrollBox = scrollBox || scrollBoxRef.current;
		}

		if (bottomLoader !== bottomLoaderRef.current) {
			bottomLoader = bottomLoader || bottomLoaderRef.current;
			bottomObserver.observe(bottomLoader);
		}

		if (topLoader !== topLoaderRef.current) {
			topLoader = topLoader || topLoaderRef.current;
			topObserver.observe(topLoader);
		}

		// const videoTags = [...scrollBox.querySelectorAll('video')];
		// console.log(videoTags);
		// videoTags.forEach(n => console.log(n));

		// console.log( videoRefs.current )

	}, [scrollBoxRef, topLoaderRef, bottomLoaderRef, videoRefs]);

	return (
		<div ref = { scrollBoxRef } className = 'videos' data-refreshing = { refreshing }>
			<div tabIndex = "0" className = 'loader top-loader' ref = { topLoaderRef }></div>
			{ videos.map(v => <div className='video' key = {v.id}>
				<video
					ref = {  videoRefs.current[ v.id ] }
					controls = { true } muted = { true } loop = { true }
					preload = "none"
					src = { testVideo2 }
				/>
				<div className = 'attribution'>
					<span>
						<span className='icon user-icon'></span>
						&nbsp;
						Username here
						&nbsp;
						{v.id}
						&nbsp;
						{page}
					</span>
				</div>
			</div>)}
			<div className = 'loader bottom-loader' ref = { bottomLoaderRef }></div>
		</div>
	);
}

export default Feed;
