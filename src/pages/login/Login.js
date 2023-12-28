import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myAPI from "../../api/api";
import "./Login.css";

const LoginPage = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const userToken = localStorage.getItem("token");

	useEffect(() => {
		if (userToken) {
			navigate("/classes");
		}
	});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data: res } = await myAPI.post("/users/login", data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("id", res.id);
			navigate("/classes");
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="login-main">
			<p className="login-title">Login</p>

			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={data.email}
					onChange={handleChange}
				></input>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={data.password}
					onChange={handleChange}
				></input>
				<button type="Submit">Login!</button>
			</form>
			<div className="login-signup">
				<p>
					Don't have an account?{" "}
					<Link to={"./signup"}>
						<button>Sign Up!</button>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
