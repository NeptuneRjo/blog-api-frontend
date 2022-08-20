import { BlogInt } from '../../types'

const fetchBlog = async (id: string | undefined): Promise<BlogInt> => {
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/blogs/${id}`, {
		credentials: 'same-origin',
	})
	const json: BlogInt = await response.json()

	return json
}

export default fetchBlog
