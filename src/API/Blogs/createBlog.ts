const createBlog = async (
	title: string,
	body: string,
	author: string
): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/blogs`,
		{
			method: 'POST',
			body: JSON.stringify({
				title,
				body,
				author,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
		}
	)

	return response
}

export default createBlog
