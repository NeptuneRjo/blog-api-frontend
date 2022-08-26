const fetchUser = async (): Promise<Response> => {
	const response: Response = await fetch(`/api/users`, {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	return response
}

export default fetchUser
