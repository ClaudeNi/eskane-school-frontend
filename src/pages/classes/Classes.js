import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myAPI from "../../api/api";
import "./Classes.css";

function ClassesPage() {
	const [classesData, setClassesData] = useState([]);
	const [newClassName, setNewClassName] = useState("");

	useEffect(() => {
		grabClassesData();
		// eslint-disable-next-line
	}, []);

	const userID = localStorage.getItem("id");
	const navigate = useNavigate();

	const grabClassesData = async () => {
		try {
			const { data: res } = await myAPI.get(`/classes/${userID}`);
			setClassesData(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const displayClasses = () => {
		return classesData.map((classData) => {
			return (
				<Link key={classData._id} to={`/classes/${classData._id}`}>
					<div className="ClassItem">Name: {classData.name}</div>
				</Link>
			);
		});
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		navigate("/");
	};

	const handleChange = (e) => {
		setNewClassName(e.target.value);
	};

	const handleCreateClass = async (e) => {
		e.preventDefault();
		try {
			const newClassData = {
				name: newClassName,
				teacher: userID,
				students: [],
			};

			const { data: res } = await myAPI.post("classes", newClassData);
			navigate(`/classes/${res.classID}`);
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<p className="Classes">Classes</p>
			<button onClick={handleLogout}>log out!</button>
			<Link to={`/profile/${localStorage.getItem("id")}`}>
				<button>Profile</button>
			</Link>
			{displayClasses()}
			<div>
				<form onSubmit={handleCreateClass}>
					<label>Name:</label>
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={newClassName}
						onChange={handleChange}
					></input>
					<button type="Submit">Create Class</button>
				</form>
			</div>
		</div>
	);
}

export default ClassesPage;
