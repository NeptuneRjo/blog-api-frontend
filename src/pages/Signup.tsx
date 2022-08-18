import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Signup = () => {
	return (
		<Form>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control type='email' placeholder='Enter email' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Confirm email address</Form.Label>
				<Form.Control type='email' placeholder='Confirm email' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control type='password' placeholder='Enter password' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Confirm password</Form.Label>
				<Form.Control type='password' placeholder='Confirm password' />
			</Form.Group>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default Signup
