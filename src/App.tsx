import React, { useEffect, useState } from 'react'
import { DeleteBlog, Navbar } from './components/components-exports'
import {
	Dashboard,
	Blog,
	Login,
	Signup,
	CreateBlog,
} from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { BlogInt, CleanUserInt } from './types'
import { fetchAllBlogs } from './API/api-exports'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

const App: React.FC = () => {
	const [blogs, setBlogs] = useState<BlogInt[] | [] | undefined>(undefined)
	const [user, setUser] = useState<CleanUserInt | undefined>(undefined)

	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		;(async function getBlogs() {
			const response = await fetchAllBlogs()
			const json = await response.json()

			if (!response.ok) {
				setError(json?.error)
			} else if (response.ok) {
				setBlogs(json?.data)
			}
		})()

		const sessionUser = sessionStorage.getItem('user')

		if (sessionUser !== 'undefined' && sessionUser !== null) {
			setUser(JSON.parse(`${sessionUser}`))
		}
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar user={user} setUser={setUser} />
				<Routes>
					<Route path='/blog/:id' element={<Blog user={user} />} />
					<Route
						path='/create-blog'
						element={
							<CreateBlog user={user} blogs={blogs} setBlogs={setBlogs} />
						}
					/>
					<Route
						path='/login'
						element={<Login user={user} setUser={setUser} />}
					/>
					<Route
						path='/signup'
						element={<Signup user={user} setUser={setUser} />}
					/>
					<Route
						path='/delete-blog/:id'
						element={<DeleteBlog setBlogs={setBlogs} blogs={blogs} />}
					/>
					<Route path='/' element={<Dashboard blogs={blogs} />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
