import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
	fetchBlog,
	updateBlogWithNewComment,
	deleteBlog,
} from '../API/api-exports'
import { CommentInt, BlogInt, CleanUserInt } from '../types'
import { Comment, CommentForm } from '../components/components-exports'
import { Button } from 'react-bootstrap'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

type Props = {
	user: CleanUserInt | undefined
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
}

const Blog: React.FC<Props> = ({ user, setBlogs }: Props) => {
	const { id } = useParams()

	const [blog, setBlog] = useState<BlogInt | null>(null)
	const [comments, setComments] = useState<CommentInt[] | []>([])
	const [error, setError] = useState<unknown | null>(null)

	const [deleting, setDeleting] = useState<boolean>(false)

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

		// Because blog can be null, this check needs to be in place to prevent errors
		if (blog !== null) {
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

	const handleBlogDelete = async () => {
		try {
			const newBlogList = await deleteBlog(id as string)
			setBlogs(newBlogList)
			setDeleting(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='blog main'>
			{blog !== null && (
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
