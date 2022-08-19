import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CleanUserInt } from '../types'

type Props = {
	handleCommentSubmit: (username: string, body: string) => void
	user: CleanUserInt | null
}

const CommentForm: React.FC<Props> = ({ handleCommentSubmit, user }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [body, setBody] = useState<string>('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (user !== null) {
			handleCommentSubmit(user.username, body)
		} else {
			handleCommentSubmit(username, body)
		}

		setBody('')
		setUsername('')
	}

	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<Form.Group className='mb-3' controlId='formBasicComment'>
				<Form.Label>Comment</Form.Label>
				<Form.Control
					as='textarea'
					placeholder='Enter a comment'
					onChange={(e) => setBody(e.target.value)}
					value={body}
				/>
			</Form.Group>
			{user === null && (
				<Form.Group className='mb-3' controlId='formBasicAuthor'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						placeholder='Enter your username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</Form.Group>
			)}
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default CommentForm
