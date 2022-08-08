import React from 'react'
import { Form, Button } from 'react-bootstrap'

const CreateBlog = () => {
	return (
		<Form>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Blog Title</Form.Label>
				<Form.Control type='email' placeholder='Enter a title' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Body</Form.Label>
				<Form.Control
					type='textarea'
					aria-label='Blog Body'
					placeholder='Write your blog'
				/>
			</Form.Group>
			<Button type='submit'>Create blog</Button>
		</Form>
	)
}

export default CreateBlog
