const signupUser = async (
	email: string,
	password: string,
	username: string
): Promise<Response> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/users/signup`, {
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
	})

	return response
}

export default signupUser
