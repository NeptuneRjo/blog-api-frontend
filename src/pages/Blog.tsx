import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Blog as BlogInterface } from '../App'
import { Form, Button } from 'react-bootstrap'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

export interface CommentInt {
	title: string
	author: string
}

export const fetchBlog = async (
	id: string | undefined
): Promise<BlogInterface> => {
	const response: Response = await fetch(`/api/blogs/${id}`)
	const json: BlogInterface = await response.json()

	return json
}

const Blog = () => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInterface | undefined>(undefined)
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<unknown | null>(null)

	const addCommentToBlog = async (newComment: CommentInt): Promise<void> => {
		const response: Response = await fetch(`/api/blogs/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				comments: [newComment, ...comments],
			}),
		})
	}

	useEffect(() => {
		;(async function setStateToReturnedBlog() {
			try {
				const fetchedBlog: BlogInterface = await fetchBlog(id)
				setBlog(fetchedBlog)
			} catch (error) {
				setError(error)
			}
		})()
	}, [])

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
							<Form>
								<Form.Group className='mb-3' controlId='formBasicComment'>
									<Form.Label>Comment</Form.Label>
									<Form.Control as='textarea' placeholder='Enter a comment' />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formBasicAuthor'>
									<Form.Label>Username</Form.Label>
									<Form.Control placeholder='Enter your username' />
								</Form.Group>
							</Form>
						</div>
						{blog.comments.length > 0 &&
							blog.comments.map((comment) => (
								<div className='blog comments-grid'>
									<div className='blog comment-body'></div>
									<div className='blog comment-author'></div>
								</div>
							))}
						{blog.comments.length === 0 && (
							<div className='blog comment'>No comments yet...</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Blog
