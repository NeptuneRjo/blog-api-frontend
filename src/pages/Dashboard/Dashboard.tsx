import React from 'react'
import { BlogCard, Hero } from '../../components/components-exports'
import { BlogInt } from '../../types'
import './style.css'

type Props = {
	blogs: BlogInt[]
}

const Dashboard: React.FC<Props> = ({ blogs }: Props) => {
	return (
		<div className='dashboard-main'>
			<Hero />
			<h3 className='title'>Blogs</h3>
			{blogs.length > 0 && (
				<div className='dashboard-grid'>
					{blogs.map((blog) => (
						<div className='dashboard-grid-item'>
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
