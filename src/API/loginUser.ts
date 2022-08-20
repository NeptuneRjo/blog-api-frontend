import { CleanUserInt } from '../types'

const loginUser = async (
	email: string,
	password: string
): Promise<CleanUserInt | undefined> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/users/login`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	const json: CleanUserInt = await response.json()

	return json
}

export default loginUser
