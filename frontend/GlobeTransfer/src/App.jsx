import React, { useEffect, useState } from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/GoogleLogin";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
	const [user, setUser] = useState();

	return (
		<GoogleOAuthProvider clientId="1058675930465-p5qnh9ahp15mnaikqtiesqv9s77hkcdk.apps.googleusercontent.com">
		<Provider store={store}>
		  <BrowserRouter> 
			<Routes>
			  <Route path="/" element={<Home />} />
			  <Route path="/login" element={<GoogleLogin />} />
			</Routes>
		  </BrowserRouter>
		  </Provider>
	  </GoogleOAuthProvider>
	);
}

export default App;