import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBlog, updateBlog } from '../../API/api-exports'
import { CommentInt, BlogInt, CleanUserInt } from '../../types'
import { Comment, CommentForm } from '../../components/components-exports'
import { Spinner } from 'react-bootstrap'
import './style.css'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

type Props = {
	user: CleanUserInt | undefined
}

const Blog: React.FC<Props> = ({ user }: Props) => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInt>()
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<string | null>(null)

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
		return (
			<div className='blog-main'>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		)
	}

	if (error) {
		return (
			<div className='action-text'>
				<p>Error: 404</p>
				<div className='action-buttons'>{error}</div>
			</div>
		)
	}

	return (
		<div className='blog-main'>
			{user !== undefined && user.role === 'Admin' && (
				<div className='blog-delete'>
					<a href={`#/delete-blog/${id}`}>Delete Blog</a>
				</div>
			)}
			<h3 className='title'>{blog?.title}</h3>
			<div className='blog-body'>
				<div className='blog-header'>
					<h6 className='blog-author'>Writen by {blog?.author}</h6>
					<div className='blog-date'>
						{formatDistanceToNow(new Date(blog?.date as string), {
							addSuffix: true,
						})}
					</div>
				</div>

				<p className='blog-text'>{blog?.body}</p>
			</div>
			<div className='blog-comments'>
				<h3 className='title'>Comments</h3>
				<div className='blog-comments-new'>
					<CommentForm handleCommentSubmit={handleCommentSubmit} user={user} />
				</div>
				{comments.length > 0 &&
					comments.map((comment) => (
						<div className='blog-comments-grid'>
							<Comment comment={comment} />
						</div>
					))}
				{comments.length === 0 && (
					<div className='action-text'>
						<p>No comments yet...</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Blog
