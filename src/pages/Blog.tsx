import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBlog, updateBlog } from '../API/api-exports'
import { CommentInt, BlogInt, CleanUserInt } from '../types'
import { Comment, CommentForm } from '../components/components-exports'
import { Button } from 'react-bootstrap'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

type Props = {
	user: CleanUserInt | undefined
}

const Blog: React.FC<Props> = ({ user }: Props) => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInt>()
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<string | null>(null)

	const [deleting, setDeleting] = useState<boolean>(false)

	useEffect(() => {
		;(async function getBlog() {
			const response = await fetchBlog(id)
			const json = await response.json()

			if (!response.ok) {
				setError(json?.error)
			} else if (response.ok) {
				setBlog(json?.data)
				setComments(json?.data?.comments)
			}
		})()
	}, [])

	const handleCommentSubmit = async (
		username: string,
		body: string
	): Promise<void> => {
		const newComment = {
			username,
			body,
		}

		// Blog *should not* be undefined if on this page, but because // /// blog can be undefined,
		// logic must be wrapped in if statement
		if (blog !== undefined) {
			const response = await updateBlog(newComment, blog, id)
			const json = await response.json()

			if (!response.ok) {
				setError(json?.error)
			} else if (response.ok) {
				setBlog(json?.data)
				setComments(json?.data?.comments)
			}
		}
	}

	if (blog === undefined && error === null) {
		return <div className=''>Loading...</div>
	}

	if (error) {
		return (
			<div>
				<h4>404</h4>
				<p>Page not found...</p>
			</div>
		)
	}

	return (
		<div className='blog main'>
			<h3 className='title'>{blog?.title}</h3>
			<div className='blog body'>
				<h6 className='blog author'>
					Writen by {blog?.author} ~{' '}
					{formatDistanceToNow(new Date(blog?.date as string), {
						addSuffix: true,
					})}
				</h6>
				<p className='blog text'>{blog?.body}</p>
			</div>
			<div className='blog comments'>
				<h3 className='title'>Comments</h3>
				<div className='blog comments-new'>
					<CommentForm handleCommentSubmit={handleCommentSubmit} user={user} />
				</div>
				{comments.length > 0 &&
					comments.map((comment) => (
						<div className='blog comments-grid'>
							<Comment comment={comment} />
						</div>
					))}
				{comments.length === 0 && (
					<div className='blog comments-none'>No comments yet...</div>
				)}
			</div>
			{user !== undefined && user.role === 'Admin' && (
				<div className='blog delete-field'>
					{deleting === false && (
						<Button href={`#/delete-blog/${id}`}>Delete Blog</Button>
					)}
				</div>
			)}
		</div>
	)
}

export default Blog
