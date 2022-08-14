import { BlogInt } from '../types'

const fetchBlog = async (id: string | undefined): Promise<BlogInt> => {
	const response: Response = await fetch(
		`https://neptunerjo-blog-api.herokuapp.com/api/blogs/${id}`
	)
	const json: BlogInt = await response.json()

	return json
}

export default fetchBlog
