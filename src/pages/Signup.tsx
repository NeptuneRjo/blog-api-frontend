import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { signupUser, logoutUser } from '../API/api-exports'
import { CleanUserInt } from '../types'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
	user: CleanUserInt | undefined
}

const Signup: React.FC<Props> = ({ setUser, user }: Props) => {
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

	const handleLogout = async (): Promise<void> => {
		const loggedOut = await logoutUser()

		setUser(loggedOut)
	}

	return (
		<div className='auth-page'>
			{user === undefined && (
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
			)}
			{user !== undefined && (
				<div className='action-text'>
					<p>You are currently signed in as {user.username}</p>
					<Button href='#/'>View blogs</Button>
					<Button onClick={() => handleLogout()}>Log out</Button>
				</div>
			)}
		</div>
	)
}

export default Signup
