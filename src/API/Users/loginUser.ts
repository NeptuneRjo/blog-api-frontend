const loginUser = async (email: string, password: string) => {
	const response: Response = await fetch(`/api/users/login`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		// credentials: 'same-origin',
	})
	const json = await response.json()

	if (response.ok) {
		return { user: json?.data?.user, error: null }
	} else {
		return { user: null, error: json?.error }
	}
}

export default loginUser
