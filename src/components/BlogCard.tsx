import React from 'react'
import { Blog } from '../App'

export type Props = {
	blog: Blog // blog prop has the typing of the Blog interface (blog object)
}

const BlogCard: React.FC<Props> = ({ blog }: Props) => {
	return <div>{blog.title}</div>
}

export default BlogCard
