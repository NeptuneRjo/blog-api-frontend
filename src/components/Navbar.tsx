import React from 'react'
import { Container, Nav, Navbar as NavBar } from 'react-bootstrap'

const Navbar = () => {
  return (
    <NavBar bg='light' expand='lg' sticky='top'>
        <Container>
            <NavBar.Brand href='/blogs'>Blog API</NavBar.Brand>
            <NavBar.Toggle aria-controls='responsive-navbar-nav' />
            <NavBar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link href='/log-in'>Log In</Nav.Link>
                    <Nav.Link href='/sign-out'>Sign Out</Nav.Link>
                    <Nav.Link href='/sign-up'>Sign Up</Nav.Link>
                </Nav>
            </NavBar.Collapse>
        </Container>  
    </NavBar>
  )
}

export default Navbar