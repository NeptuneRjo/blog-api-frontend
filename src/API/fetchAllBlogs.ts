import { BlogInt } from '../types'

const fetchAllBlogs = async (): Promise<BlogInt[]> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch('/api/blogs', {
		credentials: 'same-origin',
	})
	const json: BlogInt[] = await response.json()

	return json
}

export default fetchAllBlogs
