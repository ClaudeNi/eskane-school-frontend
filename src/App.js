import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/SignUp";
import ForgotPassPage from "./pages/forgotPass/ForgotPass";
import ClassesPage from "./pages/classes/Classes";
import ProfilePage from "./pages/profile/Profile";
import ClassPage from "./pages/classes/class";
import ErrorPage from "./pages/error/Error";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" exact Component={LoginPage} />
			<Route path="/signup" exact Component={SignUpPage} />
			<Route path="/forgotpassword" exact Component={ForgotPassPage} />
			<Route path="/classes" exact Component={ClassesPage} />
			<Route path="/classes/:classID" exact Component={ClassPage} />
			<Route path="/profile/:userID" exact Component={ProfilePage} />
			<Route path="*" Component={ErrorPage} />
		</Routes>
	);
}

export default App;
