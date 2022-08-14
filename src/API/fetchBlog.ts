import { BlogInt } from '../types'

const fetchBlog = async (id: string | undefined): Promise<BlogInt> => {
	const response: Response = await fetch(`api/blogs/${id}`)
	const json: BlogInt = await response.json()

	return json
}

export default fetchBlog
