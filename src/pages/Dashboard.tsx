import React from 'react'
import { Blog } from '../App' // Interface
import { BlogCard } from '../components/components-exports'

export type Props = {
	blogs: Blog[] // the prop blogs has the type 'Array of blogs'
}

const Dashboard: React.FC<Props> = ({ blogs }: Props) => {
	return (
		<div className='dashboard-main'>
			<h3 className='page-title'>Blogs</h3>
			{blogs.length > 0 && blogs.map((blog) => <BlogCard blog={blog} />)}
			{blogs.length === 0 && <p>No blogs to display.</p>}
		</div>
	)
}

export default Dashboard
