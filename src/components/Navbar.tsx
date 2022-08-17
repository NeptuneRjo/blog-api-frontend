import React from 'react'
import { Container, Nav, Navbar as NavBar } from 'react-bootstrap'
import { CleanUserInt } from '../types'

type Props = {
	user: CleanUserInt | undefined
}

const Navbar: React.FC<Props> = ({ user }: Props) => {
	return (
		<NavBar bg='light' expand='lg' sticky='top'>
			<Container>
				<NavBar.Brand href='#/'>Blog API</NavBar.Brand>
				<NavBar.Toggle aria-controls='basic-navbar-nav' />
				<NavBar.Collapse id='basic-navbar-nav'>
					{user === undefined && (
						<Nav className='me-auto'>
							<Nav.Link href='#/'>View Blogs</Nav.Link>
							<Nav.Link href='#/login'>Log in</Nav.Link>
							<Nav.Link href='#/signup'>Sign up</Nav.Link>
						</Nav>
					)}
					{user?.role === 'Admin' && (
						<Nav className='me-auto'>
							<NavBar.Text>Signed in as {user?.username}</NavBar.Text>
							<Nav.Link href='#/'>View Blogs</Nav.Link>
							<Nav.Link>Log out</Nav.Link>
							<Nav.Link href='#/new-blog'>Create blog</Nav.Link>
						</Nav>
					)}
					{user?.role === 'User' && (
						<Nav className='me-auto'>
							<NavBar.Text>Signed in as {user?.username}</NavBar.Text>
							<Nav.Link href='#/'>View Blogs</Nav.Link>
							<Nav.Link>Log out</Nav.Link>
						</Nav>
					)}
				</NavBar.Collapse>
			</Container>
		</NavBar>
	)
}

export default Navbar
