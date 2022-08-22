import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBlog, updateBlog, deleteBlog } from '../API/api-exports'
import { CommentInt, BlogInt, CleanUserInt } from '../types'
import { Comment, CommentForm } from '../components/components-exports'
import { Button } from 'react-bootstrap'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

type Props = {
	user: CleanUserInt | undefined
	blogs: [] | BlogInt[]
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
}

const Blog: React.FC<Props> = ({ user, setBlogs, blogs }: Props) => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInt>()
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<any>()

	const [deleting, setDeleting] = useState<boolean>(false)

	useEffect(() => {
		;(async function getBlog() {
			const response = await fetchBlog(id)
			const json = await response.json()

			if (!response.ok) {
				setError(json?.error)
			} else if (response.ok) {
				setBlog(json?.data)
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

		// Blog *should not* be undefined if on this page, but because blog can be undefined,
		// logic must be wrapped in if statement
		if (blog !== undefined) {
			const response = await updateBlog(newComment, blog, id)
			const json = await response.json()

			if (!response.ok) {
				setError(json?.error)
			} else if (response.ok) {
				setBlog(json?.data)
			}
		}
	}

	const handleBlogDelete = async () => {
		const response = await deleteBlog(id as string)
		const json = await response.json()

		if (!response.ok) {
			setError(json?.error)
		} else if (response.ok) {
			const deletedBlogId = json?.data?._id
			const cleanedBlogArray = blogs.filter((blog) => {
				return blog?._id !== deletedBlogId
			})

			setBlogs(cleanedBlogArray)
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
					{user !== undefined && user.role === 'Admin' && (
						<div className='blog delete-field'>
							{deleting === false && (
								<Button onClick={() => setDeleting(true)}>Delete Blog</Button>
							)}
							{deleting === true && (
								<>
									<Button onClick={() => handleBlogDelete()}>Delete</Button>
									<Button onClick={() => setDeleting(false)}>Cancel</Button>
								</>
							)}
						</div>
					)}
					<div className='blog comments'>
						<h3 className='title'>Comments</h3>
						<div className='blog comments-new'>
							<CommentForm
								handleCommentSubmit={handleCommentSubmit}
								user={user}
							/>
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
