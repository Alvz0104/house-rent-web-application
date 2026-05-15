import {
    Link,
    useNavigate
} from "react-router-dom";

import logo from "../assets/logo.webp";


import {
    Navbar,
    Nav,
    Container,
    Button
} from "react-bootstrap";

function NavigationBar() {

    const navigate = useNavigate();

    const token =
    localStorage.getItem("token");

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <Navbar
            expand="lg"
            className="custom-navbar"
            variant="dark"
        >

            <Container>

                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold"
                >
                    Housetify
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        <Nav.Link
                            as={Link}
                            to="/properties"
                        >
                            Properties
                        </Nav.Link>

                        {token && (

                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/add-property"
                                >
                                    Add Property
                                </Nav.Link>

                                <Nav.Link
                                    as={Link}
                                    to="/my-bookings"
                                >
                                    My Bookings
                                </Nav.Link>

                                <Nav.Link
                                    as={Link}
                                    to="/owner-dashboard"
                                >
                                    Dashboard
                                </Nav.Link>
                            </>

                        )}

                    </Nav>

                    {!token ? (

                        <>
                            <Link
                                to="/login"
                                className="
                                btn
                                btn-light
                                me-2
                                "
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="
                                custom-btn
                                text-decoration-none
                                "
                            >
                                Register
                            </Link>
                        </>

                    ) : (

                        <Button
                            variant="dark"
                            onClick={logout}
                        >
                            Logout
                        </Button>

                    )}

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );
}

export default NavigationBar;