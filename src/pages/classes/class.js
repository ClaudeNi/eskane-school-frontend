import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myAPI from "../../api/api";
import "./Classes.css";

const ClassPage = () => {
	const [usersData, setUsersData] = useState([]);
	const [classData, setClassData] = useState([{ students: [] }]);
	const { classID } = useParams();

	useEffect(() => {
		grabClassData();
		// eslint-disable-next-line
	}, []);

	const grabUsesrData = async () => {
		try {
			const { data: res } = await myAPI.get(`/users`);
			setUsersData(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const grabClassData = async () => {
		try {
			const { data: res } = await myAPI.get(`/classes/${classID}`);
			setClassData(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const displayUsers = () => {
		return usersData.map((userData) => {
			return (
				<div key={userData._id} className="UserStack">
					<label>ID: {userData._id}</label>
					<label>
						Name: {userData.firstName} {userData.lastName}
					</label>
					<button>Add to class!</button>
				</div>
			);
		});
	};

	const displayClassStudents = () => {
		console.log(classData);
		// return classData.students.map((student) => {
		// 	return (
		// 		<div className="ClassItem">
		// 			Name: {student.firstname} {student.lastName}
		// 		</div>
		// 	);
		// });
	};

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
