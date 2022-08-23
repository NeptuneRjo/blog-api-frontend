const logoutUser = async (): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/users/logout`,
		{
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'same-origin',
		}
	)

	return response
}

export default logoutUser
