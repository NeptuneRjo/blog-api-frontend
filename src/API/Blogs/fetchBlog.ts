const fetchBlog = async (id: string | undefined): Promise<Response> => {
	const response: Response = await fetch(`/api/blogs/${id}`, {
		credentials: 'same-origin',
	})

	return response
}

export default fetchBlog
