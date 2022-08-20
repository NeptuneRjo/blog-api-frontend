const logoutUser = async (): Promise<undefined> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/users/logout`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	const json = await response.json()

	// The logout call returns null instead of undefined
	if (json === null) {
		return undefined
	}

	return json
}

export default logoutUser
