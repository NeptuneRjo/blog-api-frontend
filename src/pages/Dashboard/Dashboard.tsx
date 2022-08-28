import React from 'react'
import { BlogCard, Hero } from '../../components/components-exports'
import { BlogInt } from '../../types'
import { Spinner } from 'react-bootstrap'
import './style.css'

type Props = {
	blogs: BlogInt[] | [] | undefined
}

const Dashboard: React.FC<Props> = ({ blogs }: Props) => {
	return (
		<div className='dashboard-main'>
			<Hero />
			<h3 className='title'>Blogs</h3>
			{blogs === undefined && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading ...</span>
				</Spinner>
			)}
			{blogs !== undefined && blogs.length > 0 && (
				<div className='dashboard-grid'>
					{blogs.map((blog, key) => (
						<div className='dashboard-grid-item' key={key}>
							<BlogCard blog={blog} />
						</div>
					))}
				</div>
			)}
			{blogs !== undefined && blogs.length === 0 && <p>No blogs to display.</p>}
		</div>
	)
}

export default Dashboard
