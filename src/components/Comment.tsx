import React from 'react'
import { CommentInt } from '../types'
import { Card } from 'react-bootstrap'

type Props = {
	comment: CommentInt
}

const Comment: React.FC<Props> = ({ comment }: Props) => {
	return (
		<div className='card'>
			<div className='card-body'>{comment.body}</div>
			<div className='card-username'>~{comment.username}</div>
		</div>
	)
}

export default Comment
