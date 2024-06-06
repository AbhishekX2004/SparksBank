import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Footer from "./Footer";
import Accounts from "./Accounts";
import TransferAccounts from './TransferAccounts';
import User from './User';
import './App.css';


function App() {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />}/>
					<Route path="/accounts/all" element={<Accounts />}/>
					<Route path='/accounts/:accountNumber/:amount' element={<TransferAccounts/>}/>
					<Route path='/user/:accountNumber' element={<User />}/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;