import React from 'react'
import { CommentInt } from '../types'

type Props = {
	comment: CommentInt
}

const Comment: React.FC<Props> = ({ comment }: Props) => {
	return (
		<div className='comment-main'>
			<div className='comment-body'>{comment.body}</div>
			<div className='comment-username'>~{comment.username}</div>
		</div>
	)
}

export default Comment
