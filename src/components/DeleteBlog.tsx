import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { BlogInt } from '../types'
import { deleteBlog } from '../API/api-exports'
import { useParams } from 'react-router-dom'

type Props = {
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
	blogs: [] | BlogInt[]
}

const DeleteBlog: React.FC<Props> = ({ setBlogs, blogs }: Props) => {
	const { id } = useParams()

	const [deleted, setDeleted] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

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
			setDeleted(true)
		}
	}

	if (deleted) {
		return (
			<div className='action-text'>
				<p>Blog successfully deleted!</p>
				<div className='action-buttons'>
					<Button href={`#/`}>View blogs</Button>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='action-text'>
				<p>Error</p>
				<div className='action-buttons'>{error}</div>
			</div>
		)
	}

	return (
		<div className='action-text'>
			<p>Are you sure you want to delete this blog?</p>
			<div className='action-buttons'>
				<Button onClick={() => handleBlogDelete()}>Delete</Button>
				<Button href={`#/blog/${id}`}>Go back</Button>
			</div>
		</div>
	)
}

export default DeleteBlog
