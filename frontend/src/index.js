import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, BrowserRouter, Route, Routes, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';

import { Link } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import BottomBar from './components/bottombar';
import TopBar from './components/topbar';
import Feed from './components/feed';
import Profile from './components/profile';
import EditProfile from './components/edit-profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<BrowserRouter>
			<TopBar />
			<div className = "frame">
				<Routes>
					<Route path = "/" element = { <Feed /> } />
					<Route path = "/me" element = { <Profile /> } />
					<Route path = "/edit-profile" element = { <EditProfile /> } />
				</Routes>
			</div>
			<BottomBar />
		</BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
