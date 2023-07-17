import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import testVideo1 from '../testVideo1.mp4';
import testVideo2 from '../testVideo2.mp4';

import NewQuip from './new-quip';
import Quips from './quips';

import videoApi from '../api/video';

import userService from '../service/user';

function Video({video, parent}) {

  const [showQuips, setShowQuips] = useState(false);
  const [refreshes, setRefreshes] = useState(false);
  const [canEdit, setCanEdit]     = useState(false);
  const [editing, setEditing]     = useState(false);

  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (parent) {
      const ref = videoRef.current;
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

        document.addEventListener('user-signed-in', event => setCanEdit(userService.signedIn && userService.signedIn.id === video.user_id))
        document.addEventListener('user-signed-out', event => setCanEdit(userService.signedIn && userService.signedIn.id === video.user_id))
      }, observerOpts);

      setCanEdit(userService.signedIn && userService.signedIn.id === video.user_id);

      videoObserver.observe(ref);

      return () => {
        const root = ref.getRootNode();
        if (root === document) {
          return;
        }
        videoObserver && videoObserver.unobserve(ref);
        ref.pause();
        ref.removeAttribute('src');
        ref.load();
      };
    }
  });

  const editCaptionSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    videoApi.update(video.id, formData)
    .then(updated => {
      if (!updated.id) {
        return;
      }
      event.target.reset();
      video.description = updated.description;
      setEditing(false);
    })
    .catch(console.warn);
  };

  const navigateToProfile = event => {
    event.preventDefault();
    if (!document.dispatchEvent(new CustomEvent('profileClicked', {cancelable:true}))) {
      return;
    }
    navigate(event.target.getAttribute('href'));
  };

  return (<div className='video' data-show-quips = {showQuips}>
    <div className = "super-video">
      <a className='attribution' onClick={ navigateToProfile } href = {'/user/' + video.author.id}>
        <span className='user-avatar-slot'>
          {video.avatar
            ? <img src = { video.avatar } />
            : ''
          }
        </span>
        { video.author.name }
      </a>
    </div>

    <video
      ref = { videoRef }
      controls = { true }
      autoPlay = { parent ? false : 'autoplay' }
      muted = { !!parent }
      loop = { true }
      preload = 'metadata'
      src = { video.file || testVideo2 }
    />

    <div className = "sub-video" data-editing = { editing }>

      <div className = 'caption'>
        <span className='caption-view'>
          { video.description }
        </span>
        <form onSubmit = { editCaptionSubmit } className='caption-edit'>
          <label>
            <textarea name = "video[description]" rows = "4" defaultValue={video.description}></textarea>
          </label>
          <label className = "row end">
            <button className = "uncta" onClick = { () => setEditing(false) }>cancel</button>
            &nbsp;
            <input type = "hidden" name = "video[id]" value = { video.id } />
            <input type = "submit" />
          </label>
        </form>
      </div>

      <div className = "end-brow">
        {canEdit
          ? <button className='subtle' onClick = { () => setEditing(true) } >edit caption</button>
          : ''
        }
        &nbsp;
        <button className='subtle' onClick = { () => setShowQuips(true) } >view/add comments</button>
      </div>

      <div className='quip-drawer'>
        <button className='close' onClick = { () => setShowQuips(false) }></button>
        <Quips video = { video } />
        <NewQuip video = { video } />
      </div>
    </div>

  </div>);
}

export default Video;
