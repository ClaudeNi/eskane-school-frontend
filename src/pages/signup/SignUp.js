import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myAPI from "../../api/api";
import "./SignUp.css";

function SignUpPage() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		role: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data: res } = await myAPI.post("/users", data);
			navigate("/");
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="signUp-main">
			<p className="signup-title">Sign Up</p>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="First Name"
					name="firstName"
					value={data.firstName}
					onChange={handleChange}
				></input>
				<input
					type="text"
					placeholder="Last Name"
					name="lastName"
					value={data.lastName}
					onChange={handleChange}
				></input>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={data.email}
					onChange={handleChange}
				></input>
				<input
					type="tel"
					placeholder="Phone Number"
					name="phoneNumber"
					value={data.phoneNumber}
					onChange={handleChange}
				></input>
				<div>
					<label>Role: </label>
					<select onChange={handleChange}>
						<option value={"Student"}>Student</option>
						<option value={"Teacher"}>Teacher</option>
					</select>
				</div>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={data.password}
					onChange={handleChange}
				></input>
				<button type="Submit">Sign Up!</button>
			</form>
			<div className="signup-login">
				<p>
					Already have an account?{" "}
					<Link to={".."}>
						<button>Login!</button>
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SignUpPage;
