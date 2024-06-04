import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Footer from "./Footer";
import Accounts from "./Accounts";
import './App.css';


function App() {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />}/>
					<Route path="/accounts" element={<Accounts />}/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
