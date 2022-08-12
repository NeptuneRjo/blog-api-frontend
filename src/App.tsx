import React, { useEffect, useState } from 'react'
import { Navbar } from './components/components-exports'
import {
	CreateBlog,
	Signup,
	Login,
	Dashboard,
	Blog,
} from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import { BlogInt } from './types'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

const App: React.FC = () => {
	const [blogs, setBlogs] = useState<BlogInt[] | []>([])

	useEffect(() => {
		const fetchBlogs = async (): Promise<void> => {
			const response: Response = await fetch('/api/blogs')
			const json: BlogInt[] = await response.json()

			setBlogs(json)
		}

		fetchBlogs()
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar />
				<Routes>
					<Route path='/blog/:id' element={<Blog />} />
					<Route path='create' element={<CreateBlog />} />
					<Route path='sign-up' element={<Signup />} />
					<Route path='log-in' element={<Login />} />
					<Route path='/' element={<Dashboard blogs={blogs} />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
