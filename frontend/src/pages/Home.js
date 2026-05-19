import {
    Link
} from "react-router-dom";

import {
    Container,
    Row,
    Col,
    Form
} from "react-bootstrap";

import {
    useState
} from "react";

function Home() {

    const [location, setLocation] = useState("");

    return (

        <div className="hero-section">

            <Container>

                <div className="text-center">

                    <h1 className="hero-title">
                        Find Your Perfect Home
                    </h1>

                    <p className="hero-text">
                        Discover beautiful places to live, all in one place
                    </p>

                    <div 
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '12px',
                            maxWidth: '500px',
                            margin: '32px auto',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                            display: 'flex',
                            gap: '8px'
                        }}
                    >
                        <Form.Control
                            type="text"
                            placeholder="Where are you going?"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{
                                border: 'none',
                                fontSize: '0.95rem'
                            }}
                        />
                        <Link
                            to="/properties"
                            className="custom-btn"
                            style={{
                                margin: '0 !important',
                                padding: '10px 24px !important'
                            }}
                        >
                            Search
                        </Link>
                    </div>

                </div>

            </Container>

        </div>

    );
}

export default Home;