import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';

import './App.css';
import './buttons.css';
import './drawers.css';
import './forms.css';
import './page.css';
import './video.css';
import './quip.css';

import reportWebVitals from './reportWebVitals';

import BottomBar from './components/bottombar';
import TopBar from './components/topbar';
import Snacks from './components/snacks';

import Home from './components/home';
import VideoPage from './components/video-page';
import Feed from './components/feed';
import Profile from './components/profile';
import Me from './components/me';
import EditProfile from './components/edit-profile';
import NotFound from './components/not-found';

import userService from './service/user';

userService.current();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TopBar />
      <div className = "frame">
        <Routes>
          <Route path = "/" element = { <Home /> } />
          <Route path = "/videos" element = { <Feed /> } />
          <Route path = "/me" element = { <Me /> } />
          <Route path = "/edit-profile" element = { <EditProfile /> } />
          <Route path = "/video/:videoId" element = { <VideoPage /> } />
          <Route path = "/user/:userId" element = { <Profile /> } />
          <Route path = "*" element={ <NotFound /> } />
        </Routes>
      </div>
      <BottomBar />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
