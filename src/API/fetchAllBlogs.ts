import { BlogInt } from '../types'

const fetchAllBlogs = async (): Promise<BlogInt[]> => {
	const response: Response = await fetch(
		'https://whispering-tundra-62913.herokuapp.com/api/blogs',
		{ credentials: 'same-origin' }
	)
	const json: BlogInt[] = await response.json()

	return json
}

export default fetchAllBlogs
