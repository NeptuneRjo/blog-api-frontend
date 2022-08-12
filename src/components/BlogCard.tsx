import React from 'react'
import { Card, Button } from 'react-bootstrap'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

import { BlogInt } from '../types'

type Props = {
	blog: BlogInt
}

const BlogCard: React.FC<Props> = ({ blog }: Props) => {
	return (
		<Card>
			<Card.Body>
				<Card.Header as='h5'>{blog.title.toUpperCase()}</Card.Header>
				<Card.Text style={{ margin: '1rem 0rem' }}>
					<div>Written by {blog.author}</div>
					<div>
						{formatDistanceToNow(new Date(blog.date), { addSuffix: true })}
					</div>
				</Card.Text>
				<Button variant='primary' href={`#/blog/${blog._id}`}>
					Visit blog
				</Button>
			</Card.Body>
		</Card>
	)
}

export default BlogCard
