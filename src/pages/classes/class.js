import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myAPI from "../../api/api";
import "./Classes.css";
import Spinner from "../../components/spinner/spinner";

const ClassPage = () => {
	const [usersData, setUsersData] = useState([]);
	const [classData, setClassData] = useState({ students: [] });
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
			setClassData(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleAddToClass = async (id, firstName, lastName) => {
		let newClassData = classData;
		let newStudent = { id, firstName, lastName };
		newClassData.students.push(newStudent);
		await myAPI.patch(`/classes/class/${classID}`, newClassData);
		setClassData(newClassData);
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
									userData.lastName
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

	const displayClassStudents = () => {
		return classData.students.map((student, i) => {
			return (
				<div className="ClassItem" key={i}>
					Name: {student.firstName} {student.lastName}
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
			<div>{displayClassStudents()}</div>
			<button onClick={grabUsesrData}>fetch all users</button>
			<div>{displayUsers()}</div>
		</div>
	);
};

export default ClassPage;
