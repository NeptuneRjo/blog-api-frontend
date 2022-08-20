import { CommentInt, BlogInt } from '../../types'

const updateBlogWithNewComment = async (
	newComment: CommentInt,
	blog: BlogInt,
	id: string | undefined
): Promise<BlogInt> => {
	const newCommentsArray: CommentInt[] = [newComment, ...blog.comments]
	const url = 'https://whispering-tundra-62913.herokuapp.com'

	const response: Response = await fetch(`/api/blogs/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			comments: newCommentsArray,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'same-origin',
	})
	const json: BlogInt = await response.json()

	return json
}

export default updateBlogWithNewComment
