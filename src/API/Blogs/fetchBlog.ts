const fetchBlog = async (id: string | undefined): Promise<Response> => {
	const response: Response = await fetch(
		`http://localhost:4000/api/blogs/${id}`,
		{
			credentials: 'same-origin',
		}
	)

	return response
}

export default fetchBlog
