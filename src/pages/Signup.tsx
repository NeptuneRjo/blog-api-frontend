import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { signupUser, logoutUser } from '../API/api-exports'
import { CleanUserInt, ErrorInt } from '../types'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
	user: CleanUserInt | undefined
}

const Signup: React.FC<Props> = ({ setUser, user }: Props) => {
	const [emails, setEmail] = useState({ email: '', emailCheck: '' })
	const [passwords, setPassword] = useState({ password: '', passwordCheck: '' })
	const [username, setUsername] = useState<string>('')

	const [errors, setErrors] = useState<ErrorInt>({
		email: '',
		password: '',
		username: '',
		other: '',
	})
	const [validated, setValidated] = useState<boolean>(false)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const { email } = emails
		const { password } = passwords
		const form = e.currentTarget

		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
		} else {
			e.preventDefault()

			try {
				const signedUpUser = await signupUser(email, password, username)
				setUser(signedUpUser)

				setEmail({ email: '', emailCheck: '' })
				setPassword({ password: '', passwordCheck: '' })
				setUsername('')
			} catch (err) {
				setErrors({ ...errors, other: 'Unable to sign up user' })
			}
		}

		setValidated(true)
	}

	const handleLogout = async (): Promise<void> => {
		const loggedOut = await logoutUser()

		setUser(loggedOut)
	}

	return (
		<div className='auth-page'>
			{user === undefined && (
				<Form
					onSubmit={(e) => handleFormSubmit(e)}
					validated={validated}
					noValidate
				>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							onChange={(e) => setEmail({ ...emails, email: e.target.value })}
							type='email'
							placeholder='Enter email'
							value={emails.email}
							required
						/>
						<Form.Label>Confirm email address</Form.Label>
						<Form.Control
							onChange={(e) =>
								setEmail({ ...emails, emailCheck: e.target.value })
							}
							type='email'
							placeholder='Confirm email'
							value={emails.emailCheck}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{emails.email !== emails.emailCheck && <p>Emails do not match</p>}
							{emails.email.length === 0 && <p>Please enter a valid email</p>}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
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
