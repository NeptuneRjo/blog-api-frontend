const fetchAllBlogs = async (): Promise<Response> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch('/api/blogs', {
		credentials: 'same-origin',
	})

	return response
}

export default fetchAllBlogs
