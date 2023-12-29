import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myAPI from "../../api/api";
import "./Classes.css";
import Spinner from "../../components/spinner/spinner";

const ClassPage = () => {
	const [usersData, setUsersData] = useState([]);
	const [classData, setClassData] = useState({
		teacher: {},
		students: [],
	});
	const [message, setMessage] = useState("");
	const [spinner, setSpinner] = useState(false);

	const { classID } = useParams();

	useEffect(() => {
		grabClassData();
		// eslint-disable-next-line
	}, []);

	const grabUsesrData = async () => {
		setSpinner(true);
		try {
			const { data: res } = await myAPI.get(`/users`);
			setUsersData(res.data);
			setSpinner(false);
		} catch (e) {
			console.log(e);
		}
	};

	const grabClassData = async () => {
		try {
			const { data: res } = await myAPI.get(`/classes/class/${classID}`);
			if (res.data.teacher === undefined) {
				res.data.teacher = {};
			}
			setClassData(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleAddToClass = async (id, firstName, lastName, role) => {
		try {
			let newClassData = classData;
			if (role === "Student") {
				let newStudent = { id, firstName, lastName, role };
				newClassData.students.push(newStudent);
			} else if (Object.keys(classData.teacher).length === 0) {
				newClassData.teacher = {
					id,
					firstName,
					lastName,
				};
			} else {
				setMessage("This class already has a teacher.");
			}
			await myAPI.patch(`/classes/class/${classID}`, newClassData);
			setClassData(newClassData);
		} catch (e) {
			console.log(e);
		}
	};

	const handleRemoveFromClass = async (id, role) => {
		try {
			let newClassData = classData;
			if (role === "Student") {
				classData.students.forEach((student, i) => {
					if (student.id === id) {
						newClassData.students.splice(i, 1);
					}
				});
			} else {
				console.log(classData);
				console.log(classData.teacher);
				newClassData.teacher = {};
			}
			await myAPI.patch(`/classes/class/${classID}`, newClassData);
			setClassData(newClassData);
		} catch (e) {
			console.log(e);
		}
	};

	const displayUsers = () => {
		return usersData.map((userData) => {
			if (userData.role !== "Principal") {
				return (
					<div key={userData._id} className="UserStack">
						<label>ID: {userData._id}</label>
						<label>
							Name: {userData.firstName} {userData.lastName}
						</label>
						<label>Role: {userData.role}</label>
						<button
							onClick={() => {
								handleAddToClass(
									userData._id,
									userData.firstName,
									userData.lastName,
									userData.role
								);
							}}
						>
							Add to class!
						</button>
					</div>
				);
			} else {
				return null;
			}
		});
	};

	const displayClassTeacher = () => {
		if (Object.values(classData.teacher).length !== 0) {
			return (
				<div className="ClassItem">
					<h4>Teacher</h4>
					<div>
						Name: {classData.teacher.firstName}{" "}
						{classData.teacher.lastName}
					</div>
					<button
						onClick={() => {
							handleRemoveFromClass(
								classData.teacher.id,
								"Teacher"
							);
						}}
					>
						Remove Teacher!
					</button>
				</div>
			);
		} else {
			return null;
		}
	};

	const displayClassStudents = () => {
		return classData.students.map((student, i) => {
			return (
				<div className="ClassItem" key={i}>
					<div>
						Name: {student.firstName} {student.lastName}
					</div>
					<div>Role: {student.role}</div>
					<button
						onClick={() => {
							handleRemoveFromClass(student.id, "Student");
						}}
					>
						Remove student!
					</button>
				</div>
			);
		});
	};

	if (spinner) {
		return <Spinner />;
	}

	return (
		<div>
			{classID}
			{message}
			{displayClassTeacher()}
			<div>{displayClassStudents()}</div>
			<button onClick={grabUsesrData}>fetch all users</button>
			<div>{displayUsers()}</div>
		</div>
	);
};

export default ClassPage;
