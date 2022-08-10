import React, { useEffect, useState } from 'react'
import { Navbar } from './components/components-exports'
import { CreateBlog, Signup, Login, Dashboard } from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

// The Blog objects that are returned from the backend
export interface Blog {
	_v: number
	_id: string
	author: string
	body: string
	comments: []
	date: string
	title: string
}

const App: React.FC = () => {
	const [blogs, setBlogs] = useState<Blog[] | []>([])
	// Must include the empty array type because this starts out as an empty array, and will be if no blogs are retrieved.
	// State MUST start as an array because map is used in the *Dashboard* child
	// Blog[] represents an array of the Blog interface (blog object)

	useEffect(() => {
		const fetchBlogs = async (): Promise<void> => {
			const response: Response = await fetch('/api/blogs')
			const json = await response.json()

			setBlogs(json)
		}

		fetchBlogs()
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar />
				<Routes>
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
