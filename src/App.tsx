import React, { useEffect, useState } from 'react'
import { Navbar } from './components/components-exports'
import { Dashboard, Blog } from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { BlogInt } from './types'
import { fetchAllBlogs } from './API/api-exports'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

const App: React.FC = () => {
	const [blogs, setBlogs] = useState<BlogInt[] | []>([])
	const [error, setError] = useState<unknown | null>(null)

	useEffect(() => {
		;(async function setStateToReturnedBlogs() {
			try {
				const fetchedBlogs = await fetchAllBlogs()
				setBlogs(fetchedBlogs)
			} catch (err) {
				setError(err)
			}
		})()
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar />
				<Routes>
					<Route path='/blog/:id' element={<Blog />} />
					<Route path='/' element={<Dashboard blogs={blogs} />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
