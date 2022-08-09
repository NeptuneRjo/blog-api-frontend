import React from 'react'
import { Navbar } from './components/components-exports'
import { CreateBlog, Signup, Login, Dashboard } from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

function App() {
	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar />
				<Routes>
					<Route path='create' element={<CreateBlog />} />
					<Route path='sign-up' element={<Signup />} />
					<Route path='log-in' element={<Login />} />
					<Route path='/' element={<Dashboard />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
