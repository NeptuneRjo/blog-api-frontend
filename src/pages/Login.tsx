import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CleanUserInt, ErrorInt } from '../types'
import { loginUser, logoutUser } from '../API/api-exports'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<CleanUserInt | undefined>>
	user: CleanUserInt | undefined
}

const Login: React.FC<Props> = ({ setUser, user }: Props) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [errors, setErrors] = useState<ErrorInt>({
		email: '',
		password: '',
		username: '',
		other: '',
	})

	const [validated, setValidated] = useState<boolean>(false)

	const emailValidationRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget

		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
		} else {
			e.preventDefault()
			try {
				const fetchedUser = await loginUser(email, password)
				setUser(fetchedUser)

				setEmail('')
				setPassword('')
			} catch (err) {
				setErrors({ ...errors, other: 'Unable to log in user' })
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
							{errors.other.length > 0 && <p>{errors.other}</p>}
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

export default Login
