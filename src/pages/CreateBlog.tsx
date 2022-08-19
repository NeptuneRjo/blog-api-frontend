import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CleanUserInt, BlogInt } from '../types'
import { createBlog } from '../API/api-exports'
import history from 'history/browser'

type Props = {
	user: CleanUserInt | undefined
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
}

const CreateBlog: React.FC<Props> = ({ user, setBlogs }: Props) => {
	const [title, setTitle] = useState<string>('')
	const [body, setBody] = useState<string>('')

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			if (user !== undefined) {
				const newBlogList = await createBlog(title, body, user?.username)

				setBlogs(newBlogList)

				setTitle('')
				setBody('')
				history.back()
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form onSubmit={(e) => handleFormSubmit(e)}>
			{user === undefined && (
				<div className='unauthorized'>
					<p>Sorry. You are unauthorized to access this content.</p>
					<Button href='#/'>Go back</Button>
				</div>
			)}
			{user !== undefined && user.role === 'Admin' && (
				<>
					<Form.Group className='mb-3'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							type='text'
							placeholder='Enter title'
						/>
						<Form.Label>Content</Form.Label>
						<Form.Control
							onChange={(e) => setBody(e.target.value)}
							value={body}
							as='textarea'
							placeholder='Enter blog content'
						/>
					</Form.Group>
					<Button type='submit' href='#/'>
						Create blog
					</Button>
				</>
			)}
		</Form>
	)
}

export default CreateBlog
