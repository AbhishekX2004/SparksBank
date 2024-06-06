import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Footer from "./Footer";
import Accounts from "./Accounts";
import User from './User';
import './App.css';


function App() {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />}/>
					<Route path="/accounts/:accountNumber" element={<Accounts />} />
					<Route path='/user/:accountNumber' element={<User />}/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;