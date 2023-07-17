import React, { useEffect, useRef, useState } from 'react';

import Video from './video';

import videoApi   from '../api/video';

const delay = d => new Promise(a => setTimeout(a, d));

let
  currentPage = 0,
  videoList = [],
  newVideos = [],
  getVideos,
  scrollBox,
  topLoader,
  bottomLoader;

let done = false;

function Feed() {
  const monitor = {refreshing: false};

  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState(videoList);
  const [, setPage] = useState(currentPage);

  const scrollBoxRef    = useRef(false);
  const topLoaderRef    = useRef(false);
  const bottomLoaderRef = useRef(false);
  const videoRefs       = useRef({});
  const doneRef         = useRef(false)

  const loadFeed = (page = 0) => {
    if (doneRef.current) {
      return;
    }
    if (page <= 1) {
      getVideos = videoApi.list({page:1});
      getVideos.then(v => {
        videoList = v;
        if (!v.length) {
          doneRef.current = true;
        }
        setVideos(videoList);
      });
    }
    else {
      getVideos = videoApi.list({page});
      getVideos.then(v => {
        if (!v.length) {
          doneRef.current = true;
        }
        videoList = [...videoList, ...v]
        newVideos = v;
        setVideos(videoList);
      });
    }

    return getVideos;
  };

  if (!videoList.length) {
    // loadFeed(0)
  }

  useEffect(() => {

    if (scrollBox !== scrollBoxRef.current) {
      scrollBox = scrollBoxRef.current;
    }

    const observerOpts = {root: scrollBox, threshold: 1};

    const topObserver = new IntersectionObserver(observation => {
      if ((doneRef.current && !videoList.length) || monitor.refreshing) {
        return;
      }

      currentPage = 1;
      monitor.refreshing = true;
      doneRef.current = false;

      setVideos([]);
      setPage(currentPage);
      setRefreshing(true);

      delay(500).then(() => Promise.all([ loadFeed(-1), delay(500)]))
      .then(delay(500))
      .then(() => {
        scrollBox.focus();

        const tops = videoList.map(v => v.node && v.node.offsetTop);

        if (tops.length ) {
          const top = tops[0];
          console.log(top)
          scrollBox.scrollTo({top, behavior: 'smooth'})
        }

        delay(500).then(() => {
          monitor.refreshing = false;
          setRefreshing(false);
        })

      });
    }, observerOpts);

    const bottomObserver = new IntersectionObserver(() => {

      if (doneRef.current) {
        return;
      }

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

        const tops = newVideos.map(v => v.node && v.node.offsetTop);

        if (tops.length ) {
          const top = tops[0];
          console.log(top)
          scrollBox.scrollTo({top, behavior: 'instant'})
        }

        delay(500).then(() => {
          monitor.refreshing = false;
          setRefreshing(false);
        })
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
    <div ref = { scrollBoxRef } className = 'videos' data-refreshing = { refreshing } data-done = { doneRef.current }>
      <div tabIndex = "0" className = 'loader top-loader' ref = { topLoaderRef }></div>
      {videos.map(v => <Video video = {v} parent = { scrollBoxRef } key = {v.id} /> )}
      <div className = 'loader bottom-loader' ref = { bottomLoaderRef }></div>
    </div>
  );
}

export default Feed;
