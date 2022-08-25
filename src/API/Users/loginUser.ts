const loginUser = async (
	email: string,
	password: string
): Promise<Response> => {
	const response: Response = await fetch(
		`http://localhost:4000/api/users/login`,
		{
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'same-origin',
		}
	)

	// const response: AxiosResponse = await axios({
	// 	method: 'post',
	// 	url: 'http://localhost:4000/api/users/login',
	// 	data: {
	// 		email,
	// 		password,
	// 	},
	// 	withCredentials: true,
	// })

	return response
}

export default loginUser
