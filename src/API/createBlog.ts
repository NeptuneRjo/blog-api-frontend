import { BlogInt } from '../types'

const createBlog = async (
	title: string,
	body: string,
	author: string
): Promise<BlogInt[] | []> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/blogs`, {
		method: 'POST',
		body: JSON.stringify({
			title,
			body,
			author,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	const json: BlogInt[] | [] = await response.json()

	return json
}

export default createBlog
