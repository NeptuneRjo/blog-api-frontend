import React from 'react'
import { Form, Button } from 'react-bootstrap'

const CreateBlog = () => {
	return (
		<div className='create main'>
			<h3 className='title'>Create blog</h3>
			<Form>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Blog Title</Form.Label>
					<Form.Control type='text' placeholder='Enter a title' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='ControlTextarea1'>
					<Form.Label>Body</Form.Label>
					<Form.Control
						as='textarea'
						aria-label='Blog Body'
						placeholder='Write your blog'
					/>
				</Form.Group>
				<Button type='submit'>Create blog</Button>
			</Form>
		</div>
	)
}

export default CreateBlog
