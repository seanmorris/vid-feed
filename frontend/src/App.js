import React, { useState } from 'react';
import './App.css';

import userService from './service/user';
// import videoApi    from './api/video';
// import quipApi     from './api/quip';

import BottomBar from './components/bottombar';
import TopBar from './components/topbar';
import Feed from './components/feed';

userService.current();

function App() {
	return ( <div className="App"><Feed /></div> );
}

export default App;
