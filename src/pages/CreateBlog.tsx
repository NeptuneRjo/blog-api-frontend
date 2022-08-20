import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CleanUserInt, BlogInt, ErrorInt } from '../types'
import { createBlog } from '../API/api-exports'

type Props = {
	user: CleanUserInt | undefined
	setBlogs: React.Dispatch<React.SetStateAction<[] | BlogInt[]>>
}

const CreateBlog: React.FC<Props> = ({ user, setBlogs }: Props) => {
	const [title, setTitle] = useState<string>('')
	const [body, setBody] = useState<string>('')

	const [validated, setValidated] = useState<boolean>(false)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget

		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
		} else {
			e.preventDefault()

			try {
				if (user !== undefined) {
					const newBlogList = await createBlog(title, body, user?.username)

					setBlogs(newBlogList)

					setTitle('')
					setBody('')
				}
			} catch (error) {
				console.log(error)
			}
		}

		setValidated(true)
	}

	return (
		<div className='auth-page'>
			{user === undefined && (
				<div className='action-text'>
					<p>Sorry. You are unauthorized to access this content.</p>
					<Button href='#/'>Go back</Button>
				</div>
			)}
			<Form
				onSubmit={(e) => handleFormSubmit(e)}
				validated={validated}
				noValidate
			>
				{user !== undefined && user.role === 'Admin' && (
					<>
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
						<Button type='submit'>Create blog</Button>
					</>
				)}
			</Form>
		</div>
	)
}

export default CreateBlog
