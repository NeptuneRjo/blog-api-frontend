import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Signup = () => {
	return (
		<Form>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control type='email' placeholder='Enter email' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control type='password' placeholder='Enter password' />
				<Form.Text className='text-muted'>
					Password should be at least 6 characters long
				</Form.Text>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control type='password' placeholder='Confirm password' />
			</Form.Group>
			<Button type='submit'>Sign Up</Button>
		</Form>
	)
}

export default Signup
