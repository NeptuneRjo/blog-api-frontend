const fetchBlog = async (id: string | undefined): Promise<Response> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/blogs/${id}`, {
		credentials: 'same-origin',
	})

	return response
}

export default fetchBlog
