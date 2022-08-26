const deleteBlog = async (id: string): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/blogs/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
		}
	)

	return response
}

export default deleteBlog
