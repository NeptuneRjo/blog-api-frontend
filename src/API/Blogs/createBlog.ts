const createBlog = async (
	title: string,
	body: string,
	author: string
): Promise<Response> => {
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

	return response
}

export default createBlog
