import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import userService from './service/user';
import videoApi    from './api/video';
import quipApi     from './api/quip';

import TopBar from './components/topbar';

console.clear();

userService.current();


function App() {

	const [videos, setVideos] = useState([]);

	videoApi.list().then(setVideos);

	return (
    <div className="App">
      <TopBar />
			{ videos.map(v => v.id) }
    </div>
  );
}

export default App;
