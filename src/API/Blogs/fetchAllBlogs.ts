const fetchAllBlogs = async (): Promise<Response> => {
	const response: Response = await fetch(`/api/blogs`, {
		credentials: 'same-origin',
	})

	return response
}

export default fetchAllBlogs
