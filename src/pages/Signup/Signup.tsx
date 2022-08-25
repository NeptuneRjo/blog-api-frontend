import React, { useState } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { signupUser, logoutUser } from '../../API/api-exports'
import { CleanUserInt } from '../../types'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
	user: CleanUserInt | undefined
}

const Signup: React.FC<Props> = ({ setUser, user }: Props) => {
	const [emails, setEmail] = useState({ email: '', emailCheck: '' })
	const [passwords, setPassword] = useState({ password: '', passwordCheck: '' })
	const [username, setUsername] = useState<string>('')

	const [error, setError] = useState<string | null>(null)
	const [validated, setValidated] = useState<boolean>(false)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const { email } = emails
		const { password } = passwords
		const form = e.currentTarget
		e.preventDefault()

		if (form.checkValidity() === false) {
			e.stopPropagation()
		} else {
			const response = await signupUser(email, password, username)
			// const json = await response.json()

			// if (!response.ok) {
			// 	setError(json?.error)
			// } else if (response.ok) {
			// 	setUser(json?.data?.user)
			// 	window.sessionStorage.setItem('user', JSON.stringify(json?.data?.user))
			// }
			if (response.error === null) {
				setUser(response?.user)
			} else {
				setError(response?.error)
			}
		}

		setValidated(true)
	}

	const handleLogout = async (): Promise<void> => {
		const response = await logoutUser()
		// const json = await response.json()

		// if (!response.ok) {
		// 	setError(json?.error)
		// } else if (response.ok) {
		// 	setUser(json?.data?.user)
		// }
		if (response.error === null) {
			setUser(response?.user)
		} else {
			setError(response?.error)
		}
	}

	if (user) {
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
			<h3 className='title'>Sign up</h3>
			<Form
				onSubmit={(e) => handleFormSubmit(e)}
				validated={validated}
				noValidate
			>
				<Row>
					<Form.Group className='mb-3' controlId='formBasicEmail' as={Col}>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							onChange={(e) => setEmail({ ...emails, email: e.target.value })}
							type='email'
							placeholder='Enter email'
							value={emails.email}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{emails.email !== emails.emailCheck && <p>Emails do not match</p>}
							{emails.email.length === 0 && <p>Please enter a valid email</p>}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicEmail' as={Col}>
						<Form.Label>Confirm email</Form.Label>
						<Form.Control
							onChange={(e) =>
								setEmail({ ...emails, emailCheck: e.target.value })
							}
							type='email'
							placeholder='Confirm email'
							value={emails.emailCheck}
							required
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group className='mb-3' controlId='formBasicPassword' as={Col}>
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={(e) =>
								setPassword({ ...passwords, password: e.target.value })
							}
							type='password'
							placeholder='Enter password'
							value={passwords.password}
							required
							minLength={6}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword' as={Col}>
						<Form.Label>Confirm password</Form.Label>
						<Form.Control
							onChange={(e) =>
								setPassword({ ...passwords, passwordCheck: e.target.value })
							}
							type='password'
							placeholder='Confirm password'
							value={passwords.passwordCheck}
							required
							minLength={6}
						/>
						<Form.Control.Feedback type='invalid'>
							{passwords.password !== passwords.passwordCheck && (
								<p>Passwords do not match</p>
							)}
							{passwords.password.length < 6 && (
								<p>Passwords need to be atleast 6 characters long</p>
							)}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Form.Group className='mb-3' controlId='formBasicText'>
					<Form.Label>Enter username</Form.Label>
					<Form.Control
						onChange={(e) => setUsername(e.target.value)}
						type='text'
						placeholder='Enter username'
						value={username}
						minLength={3}
					/>
					<Form.Control.Feedback type='invalid'>
						{username.length < 3 && (
							<p>Username should be atleast 3 characters long</p>
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

export default Signup
