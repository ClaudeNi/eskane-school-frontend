import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import myAPI from "../../api/api";
import "./Profile.css";

function ProfilePage() {
	const [data, setData] = useState({});
	const { userID } = useParams();

	useEffect(() => {
		grabData();
		// eslint-disable-next-line
	}, []);

	const grabData = async () => {
		try {
			const { data: res } = await myAPI.get(`/users/${userID}`);
			console.log(res.data);
			setData(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data: res } = await myAPI.patch(`/users/${userID}`, data);
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<p className="Profile">Profile</p>
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
					<label>{data.role}</label>
				</div>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={data.password}
					onChange={handleChange}
				></input>
				<button type="Submit">Click to save edits!</button>
			</form>
			<Link to={"/classes"}>
				<button>classes</button>
			</Link>
		</div>
	);
}

export default ProfilePage;
