import React, { useState, useEffect } from 'react';

import Upload from './upload';

function BottomBar() {

  const [drawer, setDrawer] = useState(null);

  const closeUpload = () => setDrawer(null);
  const openUpload  = () => {

    const event = new CustomEvent('uploadClicked', {cancelable:true})

    if (document.dispatchEvent(event)) {
      setDrawer('upload');
    }
  };

  const userLoggedOut = event => {
    closeUpload();
  };

  const videoUploaded = () => {
    setDrawer(false);
  };

  useEffect(() => {
    document.addEventListener('user-logged-out', userLoggedOut);
    document.addEventListener('videoUploaded', videoUploaded);
    return () => {
      document.removeEventListener('user-logged-out', userLoggedOut);
      document.removeEventListener('videoUploaded', videoUploaded);
    };
  });

  return (
    <div className = 'bottom-bar' data-drawer = { drawer }>
      <div className = "bar">
        <button className='bubble cta upload' onClick = { openUpload }></button>
      </div>

      <div className='drawer upload-drawer'>
        <button onClick = { closeUpload } className='close'></button>
        <Upload />
      </div>

    </div>
  );
}

export default BottomBar;
