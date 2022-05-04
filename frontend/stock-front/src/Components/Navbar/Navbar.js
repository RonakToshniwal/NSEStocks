import { Navbar,Container,Nav } from 'react-bootstrap';
const CustomNav = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Stocks App</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/searchstock">Search Stocks</Nav.Link>
                <Nav.Link href="/stocks">Index</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    );
}
 
export default CustomNav;

