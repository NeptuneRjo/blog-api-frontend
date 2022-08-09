import React from 'react'
import { Container, Nav, Navbar as NavBar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
	return (
		<NavBar bg='light' expand='lg' sticky='top'>
			<Container>
				<NavBar.Brand href='/api'>Blog API</NavBar.Brand>
				<NavBar.Toggle aria-controls='basic-navbar-nav' />
				<NavBar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#/log-in'>Log In</Nav.Link>
						<Nav.Link>Sign Out</Nav.Link>
						<Nav.Link href='#/sign-up'>Sign Up</Nav.Link>
						<Nav.Link href='#/create'>Create a blog</Nav.Link>
					</Nav>
				</NavBar.Collapse>
			</Container>
		</NavBar>
	)
}

export default Navbar
