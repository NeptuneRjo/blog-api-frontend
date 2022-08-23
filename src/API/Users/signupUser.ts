const signupUser = async (
	email: string,
	password: string,
	username: string
): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/users/signup`,
		{
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				username,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'same-origin',
		}
	)

	return response
}

export default signupUser
