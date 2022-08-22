const deleteBlog = async (id: string): Promise<Response> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/blogs/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})

	return response
}

export default deleteBlog
