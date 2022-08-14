import { BlogInt } from '../types'

const fetchBlog = async (id: string | undefined): Promise<BlogInt> => {
	const response: Response = await fetch(
		`https://whispering-tundra-62913.herokuapp.com/api/blogs/${id}`,
		{
			credentials: 'same-origin',
		}
	)
	const json: BlogInt = await response.json()

	return json
}

export default fetchBlog
