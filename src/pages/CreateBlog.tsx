import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { CleanUserInt, BlogInt } from '../types'
import { createBlog } from '../API/api-exports'

type Props = {
	user: CleanUserInt | undefined
	blogs: [] | BlogInt[]
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
}

const CreateBlog: React.FC<Props> = ({ user, setBlogs, blogs }: Props) => {
	const [title, setTitle] = useState<string>('')
	const [body, setBody] = useState<string>('')

	const [created, setCreated] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const [validated, setValidated] = useState<boolean>(false)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget
		e.preventDefault()

		if (form.checkValidity() === false) {
			e.stopPropagation()
		} else {
			if (user) {
				const response = await createBlog(title, body, user?.username)
				const json = await response.json()

				if (!response.ok) {
					setError(json?.error)
				} else if (response.ok) {
					setBlogs([...blogs, json?.data])

					setCreated(true)
					setTitle('')
					setBody('')
				}
			}
		}

		setValidated(true)
	}

	if (created) {
		return (
			<div className='auth-page'>
				<div className='action-text'>
					<p>Blog successfully created!</p>
					<div className='action-buttons'>
						<Button href='#/'>View blogs</Button>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='auth-page'>
				<div className='action-text'>
					<p>{error}</p>
					<div className='action-buttons'>
						<Button href='#/'>View blogs</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='auth-page'>
			{user === undefined && (
				<div className='action-text'>
					<p>Sorry. You are unauthorized to access this content.</p>
					<div className='action-buttons'>
						<Button href='#/'>Go back</Button>
					</div>
				</div>
			)}
			{user !== undefined && user.role === 'Admin' && (
				<Form
					onSubmit={(e) => handleFormSubmit(e)}
					validated={validated}
					noValidate
				>
					<Form.Group className='mb-3'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							type='text'
							placeholder='Enter title'
							required
						/>

						<Form.Control.Feedback type='invalid'>
							{title.length === 0 && <p>Please enter a title</p>}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Content</Form.Label>
						<Form.Control
							onChange={(e) => setBody(e.target.value)}
							value={body}
							as='textarea'
							placeholder='Enter blog content'
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{body.length === 0 && <p>Please enter some content</p>}
						</Form.Control.Feedback>
					</Form.Group>
					<div>
						{error === null && <Button type='submit'>Create blog</Button>}
						{error && (
							<Alert
								variant='danger'
								onClose={() => setError(null)}
								dismissible
							>
								Error: {error}
							</Alert>
						)}
					</div>
				</Form>
			)}
		</div>
	)
}

export default CreateBlog
