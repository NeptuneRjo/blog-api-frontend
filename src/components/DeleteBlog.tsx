import React from 'react'
import { Button } from 'react-bootstrap'
import { BlogInt } from '../types'
import { deleteBlog } from '../API/api-exports'
import { useParams } from 'react-router-dom'

type Props = {
	setError: React.Dispatch<React.SetStateAction<string | null>>
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
	blogs: [] | BlogInt[]
}

const DeleteBlog: React.FC<Props> = ({ setError, setBlogs, blogs }: Props) => {
	const { id } = useParams()

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
