import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { fetchBlog, updateBlogWithNewComment } from '../API/api-exports'
import { CommentInt, BlogInt } from '../types'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

const Blog = () => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInt | undefined>(undefined)
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<unknown | null>(null)

	const [username, setUsername] = useState<string>('')
	const [body, setBody] = useState<string>('')

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
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault()

		const newComment = {
			username,
			body,
		}

		if (blog !== undefined) {
			try {
				const updatedBlog: BlogInt = await updateBlogWithNewComment(
					newComment,
					blog,
					id
				)

				setBlog(updatedBlog)
				setComments(updatedBlog.comments)

				setUsername('')
				setBody('')
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
							<Form onSubmit={(e) => handleCommentSubmit(e)}>
								<Form.Group className='mb-3' controlId='formBasicComment'>
									<Form.Label>Comment</Form.Label>
									<Form.Control
										as='textarea'
										placeholder='Enter a comment'
										onChange={(e) => setBody(e.target.value)}
										value={body}
									/>
								</Form.Group>
								<Form.Group className='mb-3' controlId='formBasicAuthor'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										placeholder='Enter your username'
										onChange={(e) => setUsername(e.target.value)}
										value={username}
									/>
								</Form.Group>
								<Button type='submit'>Submit</Button>
							</Form>
						</div>
						{comments.length > 0 &&
							comments.map((comment) => (
								<div className='blog comments-grid'>
									<div className='blog comment-body'></div>
									<div className='blog comment-author'>{comment.username}</div>
								</div>
							))}
						{comments.length === 0 && (
							<div className='blog comment'>No comments yet...</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Blog
