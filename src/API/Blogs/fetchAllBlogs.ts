const fetchAllBlogs = async (): Promise<Response> => {
	const response: Response = await fetch(`http://localhost:4000/api/blogs`, {
		credentials: 'same-origin',
	})

	return response
}

export default fetchAllBlogs
