import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    Link
} from "react-router-dom";

import {
    Row,
    Col,
    Card,
    Form,
    Container
} from "react-bootstrap";

function Properties() {

    const [properties, setProperties] =
    useState([]);

    const [search, setSearch] =
    useState("");

    const [maxPrice, setMaxPrice] =
    useState("");

    const [wishlist, setWishlist] =
    useState(new Set());

    useEffect(() => {

        fetchProperties();

    }, []);

    const fetchProperties = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/properties"
            );

            setProperties(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const toggleWishlist = (id) => {
        const newWishlist = new Set(wishlist);
        if (newWishlist.has(id)) {
            newWishlist.delete(id);
        } else {
            newWishlist.add(id);
        }
        setWishlist(newWishlist);
    };

    return (

        <div className="py-5" style={{background: '#F7F7F7'}}>

            <Container>

                <h2 className="section-title">
                    Popular Stays
                </h2>

                <Row className="mb-5">

                    <Col md={6}>

                        <Form.Control
                            type="text"
                            placeholder="Search by location..."
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            style={{
                                borderRadius: '8px',
                                padding: '12px',
                                border: '1px solid #DDDDDD',
                                fontSize: '0.95rem'
                            }}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Control
                            type="number"
                            placeholder="Max Price (₱)"
                            onChange={(e) =>
                                setMaxPrice(
                                    e.target.value
                                )
                            }
                            style={{
                                borderRadius: '8px',
                                padding: '12px',
                                border: '1px solid #DDDDDD',
                                fontSize: '0.95rem'
                            }}
                        />

                    </Col>

                </Row>

                <Row>

                    {properties

                    .filter((property) => {

                        return (

                            property.location
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                            &&

                            (
                                maxPrice === "" ||
                                property.price <= maxPrice
                            )

                        );

                    })

                    .map((property) => (

                        <Col
                            md={6}
                            lg={4}
                            key={property._id}
                            className="mb-4"
                        >

                            <Card className="property-card h-100">

                                <div style={{position: 'relative'}}>
                                    <Card.Img
                                        variant="top"
                                        className="property-image"
                                        src={`http://localhost:5000/uploads/${property.image}`}
                                    />
                                    <button
                                        onClick={() => toggleWishlist(property._id)}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            background: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                                            fontSize: '1.2rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {wishlist.has(property._id) ? '❤️' : '🤍'}
                                    </button>
                                </div>

                                <Card.Body>

                                    <div className="property-rating">
                                        <span className="stars">★★★★★</span>
                                        <span>(128 reviews)</span>
                                    </div>

                                    <Card.Title>
                                        {property.title}
                                    </Card.Title>

                                    <Card.Text>
                                        📍 {property.location}
                                    </Card.Text>

                                    <Card.Text style={{fontSize: '0.85rem', color: '#717171'}}>
                                        🛏 {property.bedrooms} Bedrooms
                                    </Card.Text>

                                    <div className="property-price">
                                        ₱{property.price.toLocaleString()} <span style={{fontSize: '0.75rem', color: '#717171'}}>per month</span>
                                    </div>

                                    <Link
                                        to={`/property/${property._id}`}
                                        className="
                                        custom-btn
                                        text-decoration-none
                                        "
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            display: 'block'
                                        }}
                                    >
                                        View Details
                                    </Link>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

            </Container>

        </div>

    );
}

export default Properties;