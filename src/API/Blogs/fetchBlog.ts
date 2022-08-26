const fetchBlog = async (id: string | undefined): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/blogs/${id}`,
		{
			credentials: 'same-origin',
		}
	)

	return response
}

export default fetchBlog
