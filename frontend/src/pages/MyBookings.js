import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    Container,
    Row,
    Col
} from "react-bootstrap";

function MyBookings() {

    const [bookings, setBookings] =
    useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/bookings/tenant/my-bookings",

                {
                    headers: {
                        Authorization: token
                    }
                }

            );

            setBookings(res.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'approved':
                return '#31A24C';
            case 'pending':
                return '#FF9500';
            case 'rejected':
                return '#C5192D';
            default:
                return '#717171';
        }
    };

    return (

        <div style={{background: '#F7F7F7', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px'}}>

            <Container>

                <h2 className="section-title">
                    My Trips
                </h2>

                {loading ? (
                    <div style={{textAlign: 'center', padding: '40px'}}>Loading...</div>
                ) : bookings.length === 0 ? (
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '40px',
                        textAlign: 'center',
                        color: '#717171'
                    }}>
                        <p style={{fontSize: '1rem', marginBottom: '8px'}}>No bookings yet</p>
                        <p style={{fontSize: '0.9rem'}}>Start exploring properties to book your next stay</p>
                    </div>
                ) : (
                    <Row>
                        {bookings.map((booking) => (

                            <Col md={6} lg={4} key={booking._id} className="mb-4">

                                <div style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}
                                >

                                    {booking.property?.image && (
                                        <img
                                            src={`http://localhost:5000/uploads/${booking.property.image}`}
                                            alt={booking.property?.title}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    )}

                                    <div style={{padding: '16px'}}>

                                        <h4 style={{
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            marginBottom: '12px'
                                        }}>
                                            {booking.property?.title}
                                        </h4>

                                        <p style={{
                                            fontSize: '0.85rem',
                                            color: '#717171',
                                            marginBottom: '8px'
                                        }}>
                                            📍 {booking.property?.location}
                                        </p>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingTop: '12px',
                                            borderTop: '1px solid #DDDDDD'
                                        }}>

                                            <span style={{
                                                display: 'inline-block',
                                                background: getStatusColor(booking.status),
                                                color: 'white',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                textTransform: 'capitalize'
                                            }}>
                                                {booking.status}
                                            </span>

                                            <span style={{
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}>
                                                ₱{booking.property?.price}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </Col>

                        ))}
                    </Row>
                )}

            </Container>

        </div>

    );
}

export default MyBookings;