import React from 'react'
import { BlogCard } from '../components/components-exports'
import { BlogInt } from '../types'

type Props = {
	blogs: BlogInt[]
}

const Dashboard: React.FC<Props> = ({ blogs }: Props) => {
	return (
		<div className='dashboard main'>
			<h3 className='title'>Blogs</h3>
			{blogs.length > 0 && (
				<div className='dashboard grid'>
					{blogs.map((blog) => (
						<div className='grid-item'>
							<BlogCard blog={blog} />
						</div>
					))}
				</div>
			)}
			{blogs.length === 0 && <p>No blogs to display.</p>}
		</div>
	)
}

export default Dashboard
