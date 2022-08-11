import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
	return (
		<div className='login main'>
			<h3 className='title'>Log in</h3>
			<Form>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Enter password' />
				</Form.Group>
				<Button type='submit'>Log in</Button>
			</Form>
		</div>
	)
}

export default Login
