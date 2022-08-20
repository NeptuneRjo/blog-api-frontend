import { BlogInt } from '../../types'

const deleteBlog = async (id: string) => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/blogs/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	const json: BlogInt[] = await response.json()

	return json
}

export default deleteBlog
