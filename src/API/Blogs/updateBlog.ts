import { CommentInt, BlogInt } from '../../types'

const updateBlogWithNewComment = async (
	newComment: CommentInt,
	blog: BlogInt,
	id: string | undefined
): Promise<Response> => {
	const newCommentsArray: CommentInt[] = [newComment, ...blog.comments]

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

	return response
}

export default updateBlogWithNewComment
