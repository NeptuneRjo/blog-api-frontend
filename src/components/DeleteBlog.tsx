import React from 'react'
import { Button } from 'react-bootstrap'

type Props = {
	handleBlogDelete: () => void
	id: string | undefined
	setDeleting: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteBlog: React.FC<Props> = ({
	handleBlogDelete,
	setDeleting,
}: Props) => {
	return (
		<div className='action-text'>
			<p>Are you sure you want to delete this blog?</p>
			<div className='action-buttons'>
				<Button onClick={() => handleBlogDelete()}>Delete</Button>
				<Button onClick={() => setDeleting(false)}>Go back</Button>
			</div>
		</div>
	)
}

export default DeleteBlog
