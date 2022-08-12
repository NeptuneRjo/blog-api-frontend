import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { fetchBlog, updateBlogWithNewComment } from '../API/api-exports'
import { CommentInt, BlogInt } from '../types'
import { Comment, CommentForm } from '../components/components-exports'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

const Blog = () => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInt | undefined>(undefined)
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<unknown | null>(null)

	useEffect(() => {
		;(async function setStateToReturnedBlog() {
			try {
				const fetchedBlog: BlogInt = await fetchBlog(id)
				setBlog(fetchedBlog)
				setComments(fetchedBlog.comments)
			} catch (err) {
				setError(err)
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

		// Because blog can be undefined, this check needs to be in place to prevent errors
		if (blog !== undefined) {
			try {
				const updatedBlog: BlogInt = await updateBlogWithNewComment(
					newComment,
					blog,
					id
				)

				setBlog(updatedBlog)
				setComments(updatedBlog.comments)
			} catch (err) {
				setError(err)
			}
		}
	}

	return (
		<div className='blog main'>
			{blog !== undefined && (
				<>
					<h3 className='title'>{blog?.title}</h3>
					<div className='blog body'>
						<h6 className='blog author'>
							Writen by {blog?.author} ~{' '}
							{formatDistanceToNow(new Date(blog.date), { addSuffix: true })}
						</h6>
						<p className='blog text'>{blog?.body}</p>
					</div>
					<div className='blog comments'>
						<div className='blog comments-new'>
							<CommentForm handleCommentSubmit={handleCommentSubmit} />
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
				</>
			)}
		</div>
	)
}

export default Blog
