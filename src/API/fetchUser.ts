import { CleanUserInt } from '../types'

// CleanUserInt is the User model without sensitive information
const fetchUser = async (): Promise<CleanUserInt | null> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/users`, {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})
	const json: CleanUserInt | null = await response.json()

	return json
}

export default fetchUser
