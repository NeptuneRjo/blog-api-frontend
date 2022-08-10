import React from 'react'
import { Blog } from '../App'

export type Props = {
	blogs: Blog[] // the prop blogs has the type 'Array of blogs'
}

const Dashboard: React.FC<Props> = ({ blogs }: Props) => {
	return (
		<div>
			{blogs.map((blog) => (
				<div>{blog.title}</div>
			))}
		</div>
	)
}

export default Dashboard
