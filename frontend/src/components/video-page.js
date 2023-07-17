import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import Video from "./video";
import videoApi from "../api/video";

export default function VideoPage() {
	const { videoId } = useParams();
	const [video, setVideo] = useState(false);
	const videoIdRef = useRef();
	useEffect(() => {
		if (videoId !== videoIdRef.current) {
			videoApi.read(videoId).then(setVideo);
			videoIdRef.current = videoId;
		}
	});
	return (<div className = "videos">{ video ? (<Video video = { video }></Video>) : '' }</div>);
}
