import { CleanUserInt } from '../types'

const signupUser = async (
	email: string,
	password: string
): Promise<CleanUserInt | null> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/users/signup`, {
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

	const json: CleanUserInt | null = await response.json()

	return json
}

export default signupUser
