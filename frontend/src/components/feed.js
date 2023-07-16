import React, { useEffect, useRef, useState } from 'react';

import Video from './video';

import videoApi   from '../api/video';

const delay = d => new Promise(a => setTimeout(a, d));

let
	currentPage = 0,
	videoList = [],
	getVideos,
	scrollBox,
	topLoader,
	bottomLoader;

function Feed() {
	const monitor = {refreshing: false};

	const [refreshing, setRefreshing] = useState(false);
	const [videos, setVideos] = useState(videoList);
	const [, setPage] = useState(currentPage);

	const loadFeed = (page = 0) => {
		if (page <= 1) {
			getVideos = videoApi.list({page:1});
			getVideos.then(v => {
				videoList = v;
				setVideos(videoList);
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
	const videoRefs       = useRef({});

	useEffect(() => {

		if (scrollBox !== scrollBoxRef.current) {
			scrollBox = scrollBoxRef.current;
		}

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

			delay(500).then(() => Promise.all([ loadFeed(-1), delay(500)]))
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

			delay(500).then(() => Promise.all([ loadFeed(currentPage), delay(500)]))
			.then(() => {
				scrollBox.focus();
				monitor.refreshing = false;
				setRefreshing(false);
			});
		}, observerOpts);

		if (bottomLoader !== bottomLoaderRef.current) {
			bottomLoader = bottomLoaderRef.current;
			bottomObserver.observe(bottomLoader);
		}

		if (topLoader !== topLoaderRef.current) {
			topLoader = topLoaderRef.current;
			topObserver.observe(topLoader);
		}

		return () => {
			// topObserver.unobserve(topLoader);
			// bottomObserver.unobserve(bottomLoader);
			// videoList.length = 0;
		};

	}, [scrollBoxRef, topLoaderRef, bottomLoaderRef, videoRefs]);

	return (
		<div ref = { scrollBoxRef } className = 'videos' data-refreshing = { refreshing }>
			<div tabIndex = "0" className = 'loader top-loader' ref = { topLoaderRef }></div>
			{ videos.map(v => <Video video = {v} parent = { scrollBoxRef } key = {v.id} /> ) }
			<div className = 'loader bottom-loader' ref = { bottomLoaderRef }></div>
		</div>
	);
}

export default Feed;
