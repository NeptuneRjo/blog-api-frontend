import { BlogInt } from '../types'

const fetchAllBlogs = async (): Promise<BlogInt[]> => {
	const response: Response = await fetch(
		'https://neptunerjo-blog-api.herokuapp.com/api/blogs'
	)
	const json: BlogInt[] = await response.json()

	return json
}

export default fetchAllBlogs
