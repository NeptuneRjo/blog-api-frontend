import React from 'react'
import { Blog } from '../App'
import { Card, Button } from 'react-bootstrap'

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

export type Props = {
	blog: Blog // blog prop has the typing of the Blog interface (blog object)
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
