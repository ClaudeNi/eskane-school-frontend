const token = localStorage.getItem("token");

const ErrorPage = () => {
	const displayLogIn = () => {
		return <div>Please log in to view the website!</div>;
	};

	return (
		<div>
			error
			{token ? <div /> : displayLogIn()}
		</div>
	);
};

export default ErrorPage;
