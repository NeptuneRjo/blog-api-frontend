import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { CleanUserInt } from '../../types'
import { loginUser, logoutUser } from '../../API/api-exports'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
	user: CleanUserInt | undefined
}

const Login: React.FC<Props> = ({ setUser, user }: Props) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [validated, setValidated] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const emailValidationRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget
		e.preventDefault()

		if (form.checkValidity() === false) {
			e.stopPropagation()
		} else {
			const response = await loginUser(email, password)
			const json = await response.json()

			if (!response.ok) {
				setError('Error Occured: Unable to loggin in user')
			} else {
				setUser(json?.data?.user)
				sessionStorage.setItem('user', JSON.stringify(json?.data?.user))
			}
		}

		setValidated(true)
	}

	const handleLogout = async (): Promise<void> => {
		const response = await logoutUser()
		const json = await response.json()

		if (!response.ok) {
			setError(json?.error)
		} else if (response.ok) {
			setUser(json?.data?.user)
			sessionStorage.setItem('user', JSON.stringify(json?.data?.user))
		}
	}

	if (user !== undefined) {
		return (
			<div className='action-text'>
				<p>You are currently signed in as {user.username}</p>
				<div className='action-buttons'>
					<Button href='#/'>View blogs</Button>
					<Button onClick={() => handleLogout()}>Log out</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='auth-page'>
			<h3 className='title'>Login</h3>
			<Form
				onSubmit={(e) => handleFormSubmit(e)}
				validated={validated}
				noValidate
			>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						placeholder='Enter email'
						required
					/>
					<Form.Label>Password</Form.Label>
					<Form.Control
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						placeholder='Enter password'
						required
						minLength={6}
					/>
					<Form.Control.Feedback type='invalid'>
						{(password.length < 6 ||
							!email.toLowerCase().match(emailValidationRegex)) && (
							<p>Please enter a valid email and/or password</p>
						)}
					</Form.Control.Feedback>
				</Form.Group>
				<div>
					{error === null && <Button type='submit'>Submit</Button>}
					{error && (
						<Alert variant='danger' onClose={() => setError(null)} dismissible>
							{error}
						</Alert>
					)}
				</div>
			</Form>
		</div>
	)
}

export default Login
