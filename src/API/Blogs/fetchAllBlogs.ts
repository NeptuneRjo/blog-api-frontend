const fetchAllBlogs = async (): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/blogs`,
		{
			credentials: 'same-origin',
		}
	)

	return response
}

export default fetchAllBlogs
