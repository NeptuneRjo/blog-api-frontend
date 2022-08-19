import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CleanUserInt } from '../types'
import { loginUser } from '../API/api-exports'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
}

const Login: React.FC<Props> = ({ setUser }: Props) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<any>()

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const fetchedUser = await loginUser(email, password)
			setUser(fetchedUser)

			setEmail('')
			setPassword('')
		} catch (err) {
			setError(err)
		}
	}

	return (
		<Form onSubmit={(e) => handleFormSubmit(e)}>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					placeholder='Enter email'
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					placeholder='Enter password'
				/>
			</Form.Group>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default Login
