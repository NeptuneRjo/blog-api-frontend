import { BlogInt } from '../types'

const fetchAllBlogs = async (): Promise<BlogInt[]> => {
	const response: Response = await fetch('/api/blogs')
	const json: BlogInt[] = await response.json()

	return json
}

export default fetchAllBlogs
