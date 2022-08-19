import React, { useEffect, useState } from 'react'
import { Navbar } from './components/components-exports'
import { Dashboard, Blog, Login, Signup } from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { BlogInt, CleanUserInt } from './types'
import { fetchAllBlogs, fetchUser } from './API/api-exports'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

const App: React.FC = () => {
	const [blogs, setBlogs] = useState<BlogInt[] | []>([])
	const [user, setUser] = useState<CleanUserInt | undefined>(undefined)

	const [blogError, setBlogError] = useState<unknown | null>(null)
	const [userError, setUserError] = useState<unknown | null>(null)

	useEffect(() => {
		;(async function setStateToReturnedBlogs() {
			try {
				const fetchedBlogs = await fetchAllBlogs()
				setBlogs(fetchedBlogs)
			} catch (err) {
				setBlogError(err)
			}
		})()
		if (user === null) {
			;(async function setStateToReturnUser() {
				try {
					const fetchedUser = await fetchUser()
					setUser(fetchedUser)
				} catch (err) {
					setUserError(err)
				}
			})()
		}
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar user={user} setUser={setUser} />
				<Routes>
					<Route
						path='/blog/:id'
						element={<Blog user={user} setBlogs={setBlogs} />}
					/>
					<Route path='/login' element={<Login setUser={setUser} />} />
					<Route path='/signup' element={<Signup setUser={setUser} />} />
					<Route path='/' element={<Dashboard blogs={blogs} />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
