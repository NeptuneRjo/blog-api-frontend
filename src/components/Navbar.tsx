import React from 'react'
import { Container, Nav, Navbar as NavBar } from 'react-bootstrap'

const Navbar = () => {
	return (
		<NavBar bg='light' expand='lg' sticky='top'>
			<Container>
				<NavBar.Brand href='#/'>Blog API</NavBar.Brand>
				<NavBar.Toggle aria-controls='basic-navbar-nav' />
				<NavBar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#/'>View Blogs</Nav.Link>
					</Nav>
				</NavBar.Collapse>
			</Container>
		</NavBar>
	)
}

export default Navbar
