const deleteBlog = async (id: string): Promise<Response> => {
	const response: Response = await fetch(
		`http://localhost:4000/api/blogs/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'same-origin',
		}
	)

	return response
}

export default deleteBlog
