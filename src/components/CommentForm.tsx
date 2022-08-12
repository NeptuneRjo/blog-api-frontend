import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

type Props = {
	handleCommentSubmit: (username: string, body: string) => void
}

const CommentForm: React.FC<Props> = ({ handleCommentSubmit }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [body, setBody] = useState<string>('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		handleCommentSubmit(username, body)

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
			<Form.Group className='mb-3' controlId='formBasicAuthor'>
				<Form.Label>Username</Form.Label>
				<Form.Control
					placeholder='Enter your username'
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
			</Form.Group>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default CommentForm
