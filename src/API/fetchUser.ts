import { UserInt, CleanUserInt } from '../types'

// CleanUserInt is the User model without sensitive information
const fetchUser = async (): Promise<CleanUserInt> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch('/api/users', {
		credentials: 'same-origin',
	})
	const json: CleanUserInt = await response.json()

	return json
}

export default fetchUser
