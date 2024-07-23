import React from "react";
import logo from "./logo.svg";
import "./App.css"
import "@fonts/integralcf-bold.otf"
import "@fonts/integralcf-medium.otf"
import "@fonts/integralcf-regular.otf"
import "@fonts/integralcf-demibold.otf"
import "@fonts/integralcf-extrabold.otf"
import "@fonts/integralcf-heavy.otf"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/home/Home";
import AuthRoutes from "@routes/AuthRoutes";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth/*" element={<AuthRoutes/>} />	
				</Routes>
			</Router>
		</div>
	);
}

export default App;
