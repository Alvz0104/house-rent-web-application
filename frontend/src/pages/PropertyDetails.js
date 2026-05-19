import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import axios from "axios";

import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";

function PropertyDetails() {

    const { id } = useParams();

    const [property, setProperty] =
    useState(null);

    useEffect(() => {

        fetchProperty();

    }, []);

    const fetchProperty = async () => {

        const res = await axios.get(
            `http://localhost:5000/api/properties/${id}`
        );

        setProperty(res.data);

    };

    const handleBooking = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.post(

                `http://localhost:5000/api/bookings/${id}`,

                {},

                {
                    headers: {
                        Authorization: token
                    }
                }

            );

            alert(res.data.message);

        } catch (error) {

            alert(error.response.data.message);

        }

    };

    if (!property) {

        return <h2 className="text-center mt-5">Loading...</h2>;

    }

    return (

        <div style={{background: '#F7F7F7', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px'}}>

            <Container>

                <Row className="mb-4">

                    <Col lg={8}>

                        <div className="property-details-hero">
                            <img
                                src={`http://localhost:5000/uploads/${property.image}`}
                                alt={property.title}
                            />
                        </div>

                        <div className="property-details-header">

                            <h1 className="property-details-title">
                                {property.title}
                            </h1>

                            <div className="property-details-location">
                                <span>📍 {property.location}</span>
                                <span>|</span>
                                <span>★★★★★ (128 reviews)</span>
                            </div>

                        </div>

                        <div style={{background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '32px'}}>

                            <h3 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px'}}>
                                About this place
                            </h3>

                            <p style={{color: '#717171', lineHeight: '1.6', marginBottom: '20px'}}>
                                {property.description}
                            </p>

                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px'}}>
                                <div>
                                    <div style={{fontSize: '2rem'}}>🛏</div>
                                    <div style={{fontWeight: '600', marginBottom: '4px'}}>Bedrooms</div>
                                    <div style={{color: '#717171'}}>{property.bedrooms} bedrooms</div>
                                </div>
                                <div>
                                    <div style={{fontSize: '2rem'}}>📍</div>
                                    <div style={{fontWeight: '600', marginBottom: '4px'}}>Location</div>
                                    <div style={{color: '#717171'}}>Prime location</div>
                                </div>
                                <div>
                                    <div style={{fontSize: '2rem'}}>⭐</div>
                                    <div style={{fontWeight: '600', marginBottom: '4px'}}>Rating</div>
                                    <div style={{color: '#717171'}}>5.0 (128)</div>
                                </div>
                            </div>

                        </div>

                        <div style={{background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '32px'}}>

                            <h3 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px'}}>
                                Amenities
                            </h3>

                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px'}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <span style={{fontSize: '1.5rem'}}>🛁</span>
                                    <span>Bathroom</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <span style={{fontSize: '1.5rem'}}>🍳</span>
                                    <span>Kitchen</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <span style={{fontSize: '1.5rem'}}>📺</span>
                                    <span>TV</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <span style={{fontSize: '1.5rem'}}>🌐</span>
                                    <span>WiFi</span>
                                </div>
                            </div>

                        </div>

                    </Col>

                    <Col lg={4}>

                        <div className="booking-section">

                            <div className="price">
                                ₱{property.price.toLocaleString()}
                            </div>

                            <p style={{color: '#717171', marginBottom: '20px'}}>per month</p>

                            <Button
                                className="custom-btn w-100"
                                onClick={handleBooking}
                                style={{
                                    background: '#FF385C',
                                    border: 'none',
                                    padding: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}
                            >
                                Request to Book
                            </Button>

                            <div style={{marginTop: '20px', padding: '16px', background: '#F7F7F7', borderRadius: '8px'}}>

                                <h4 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '12px'}}>Host</h4>

                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#FF385C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'}}>
                                        J
                                    </div>
                                    <div>
                                        <div style={{fontWeight: '600'}}>John Doe</div>
                                        <div style={{fontSize: '0.85rem', color: '#717171'}}>Host since 2023</div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </Col>

                </Row>

            </Container>

        </div>

    );
}

export default PropertyDetails;