import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    Navbar,
    Nav,
    Container,
    Button,
    Form
} from "react-bootstrap";

function NavigationBar() {

    const navigate = useNavigate();

    const token =
    localStorage.getItem("token");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");

    };

    return (

        <Navbar
            expand="lg"
            className="custom-navbar"
            sticky="top"
        >

            <Container>

                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold"
                >
                    🏠 Housetify
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-between">

                    <Nav className="me-auto ms-5">

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
                                    Host
                                </Nav.Link>

                                <Nav.Link
                                    as={Link}
                                    to="/my-bookings"
                                >
                                    Trips
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

                    <div className="d-flex align-items-center gap-2">

                        {!token ? (

                            <>
                                <Link
                                    to="/login"
                                    className="
                                    btn
                                    btn-sm
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
                                    btn-sm
                                    "
                                    style={{padding: "8px 20px"}}
                                >
                                    Sign Up
                                </Link>
                            </>

                        ) : (

                            <Button
                                variant="outline-dark"
                                size="sm"
                                onClick={logout}
                            >
                                Logout
                            </Button>

                        )}

                    </div>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );
}

export default NavigationBar;