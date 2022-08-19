import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { signupUser } from '../API/api-exports'
import { CleanUserInt } from '../types'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
}

const Signup: React.FC<Props> = ({ setUser }: Props) => {
	const [email, setEmail] = useState<string>('')
	const [emailCheck, setEmailCheck] = useState<string>('')

	const [password, setPassword] = useState<string>('')
	const [passwordCheck, setPasswordCheck] = useState<string>('')

	const [username, setUsername] = useState<string>('')

	const [error, setError] = useState<unknown | null>(null)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (email !== emailCheck || password !== passwordCheck) {
			return
		}

		try {
			const signedUpUser = await signupUser(email, password, username)
			setUser(signedUpUser)

			setEmail('')
			setEmailCheck('')
			setPassword('')
			setPasswordCheck('')
			setUsername('')
		} catch (err) {
			setError(err)
		}
	}

	return (
		<Form onSubmit={(e) => handleFormSubmit(e)}>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					placeholder='Enter email'
					value={email}
				/>
				<Form.Label>Confirm email address</Form.Label>
				<Form.Control
					onChange={(e) => setEmailCheck(e.target.value)}
					type='email'
					placeholder='Confirm email'
					value={emailCheck}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					placeholder='Enter password'
					value={password}
				/>
				<Form.Label>Confirm password</Form.Label>
				<Form.Control
					onChange={(e) => setPasswordCheck(e.target.value)}
					type='password'
					placeholder='Confirm password'
					value={passwordCheck}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicText'>
				<Form.Label>Enter username</Form.Label>
				<Form.Control
					onChange={(e) => setUsername(e.target.value)}
					type='text'
					placeholder='Enter username'
					value={username}
				/>
			</Form.Group>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default Signup
