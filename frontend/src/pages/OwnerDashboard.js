import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";

function OwnerDashboard() {

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

                "http://localhost:5000/api/bookings/owner/bookings",

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

    const updateStatus = async (
        bookingId,
        status
    ) => {

        try {

            const token =
            localStorage.getItem("token");

            await axios.put(

                `http://localhost:5000/api/bookings/status/${bookingId}`,

                { status },

                {
                    headers: {
                        Authorization: token
                    }
                }

            );

            fetchBookings();

        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div style={{background: '#F7F7F7', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px'}}>

            <Container>

                <h2 className="section-title">
                    Booking Requests
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
                        <p style={{fontSize: '1rem', marginBottom: '8px'}}>No booking requests</p>
                    </div>
                ) : (
                    <Row>
                        {bookings.map((booking) => (

                            <Col lg={6} key={booking._id} className="mb-4">

                                <div style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}
                                >

                                    <div style={{display: 'flex', gap: '16px', marginBottom: '16px'}}>

                                        {booking.property?.image && (
                                            <img
                                                src={`http://localhost:5000/uploads/${booking.property.image}`}
                                                alt={booking.property?.title}
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        )}

                                        <div style={{flex: 1}}>

                                            <h4 style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                marginBottom: '4px'
                                            }}>
                                                {booking.property?.title}
                                            </h4>

                                            <p style={{
                                                fontSize: '0.85rem',
                                                color: '#717171',
                                                marginBottom: '8px'
                                            }}>
                                                Tenant: <strong>{booking.tenant?.name}</strong>
                                            </p>

                                            <p style={{
                                                fontSize: '0.85rem',
                                                color: '#717171',
                                                marginBottom: '8px'
                                            }}>
                                                Email: <strong>{booking.tenant?.email}</strong>
                                            </p>

                                            <span style={{
                                                display: 'inline-block',
                                                background: booking.status === 'pending' ? '#FFF3CD' : booking.status === 'approved' ? '#E8F5E9' : '#FFE5E5',
                                                color: booking.status === 'pending' ? '#856404' : booking.status === 'approved' ? '#31A24C' : '#C5192D',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                textTransform: 'capitalize'
                                            }}>
                                                {booking.status}
                                            </span>

                                        </div>

                                    </div>

                                    {booking.status === 'pending' && (
                                        <div style={{display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid #DDDDDD', paddingTop: '16px'}}>

                                            <Button
                                                style={{
                                                    background: '#31A24C',
                                                    border: 'none',
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    fontSize: '0.85rem'
                                                }}
                                                onClick={() =>
                                                    updateStatus(
                                                        booking._id,
                                                        "approved"
                                                    )
                                                }
                                            >
                                                ✓ Approve
                                            </Button>

                                            <Button
                                                style={{
                                                    background: '#C5192D',
                                                    border: 'none',
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    fontSize: '0.85rem'
                                                }}
                                                onClick={() =>
                                                    updateStatus(
                                                        booking._id,
                                                        "rejected"
                                                    )
                                                }
                                            >
                                                ✕ Reject
                                            </Button>

                                        </div>
                                    )}

                                </div>

                            </Col>

                        ))}
                    </Row>
                )}

            </Container>

        </div>

    );
}

export default OwnerDashboard;