const loginUser = async (
	email: string,
	password: string
): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/users/login`,
		{
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
		}
	)

	return response
}

export default loginUser
