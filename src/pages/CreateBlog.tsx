import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { CleanUserInt } from '../types'

type Props = {
	user: CleanUserInt | undefined
}

const CreateBlog: React.FC<Props> = ({ user }: Props) => {
	return (
		<Form>
			{user === undefined && (
				<div className='unauthorized'>
					<p>Sorry. You are unauthorized to access this content.</p>
					<Button href='#/'>Go back</Button>
				</div>
			)}
			{user !== undefined && user.role === 'Admin' && (
				<Form.Group className='mb-3'>
					<Form.Label>Title</Form.Label>
					<Form.Control type='text' placeholder='Enter title' />
					<Form.Label>Content</Form.Label>
					<Form.Control type='text' placeholder='Enter blog content' />
				</Form.Group>
			)}
		</Form>
	)
}

export default CreateBlog
