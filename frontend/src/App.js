import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import userService from './service/user';
// import videoApi    from './api/video';
// import quipApi     from './api/quip';

import TopBar from './components/topbar';
import Feed from './components/feed';

userService.current();

function App() {
	return (
    <div className="App">

			<TopBar />

			<div className = 'frame'>
				<Feed />
			</div>

			<div className = 'bottom-bar'>
				<a>+</a>
			</div>

    </div>
  );
}

export default App;
