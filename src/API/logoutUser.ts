import { CleanUserInt } from '../types'

const logoutUser = async (): Promise<CleanUserInt | null> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'
	const local = 'http://localhost:4000'

	const response: Response = await fetch(`${local}/api/users/logout`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	const json: CleanUserInt | null = await response.json()

	return json
}

export default logoutUser
