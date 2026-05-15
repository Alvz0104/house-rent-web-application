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
    Form
} from "react-bootstrap";

function Properties() {

    const [properties, setProperties] =
    useState([]);

    const [search, setSearch] =
    useState("");

    const [maxPrice, setMaxPrice] =
    useState("");

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

    return (

        <div className="container mt-5">

            <h2 className="section-title">
                Available Properties
            </h2>

            <Row className="mb-4">

                <Col md={6}>

                    <Form.Control
                        type="text"
                        placeholder="Search by location"
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </Col>

                <Col md={6}>

                    <Form.Control
                        type="number"
                        placeholder="Maximum Price"
                        onChange={(e) =>
                            setMaxPrice(
                                e.target.value
                            )
                        }
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
                        md={4}
                        key={property._id}
                        className="mb-4"
                    >

                        <Card className="property-card">

                            <Card.Img
                                variant="top"
                                className="property-image"
                                src={`http://localhost:5000/uploads/${property.image}`}
                            />

                            <Card.Body>

                                <Card.Title>
                                    {property.title}
                                </Card.Title>

                                <Card.Text>
                                    📍 {property.location}
                                </Card.Text>

                                <Card.Text>
                                    ₱ {property.price}
                                </Card.Text>

                                <Card.Text>
                                    🛏 {property.bedrooms}
                                    {" "}
                                    Bedrooms
                                </Card.Text>

                                <Link
                                    to={`/property/${property._id}`}
                                    className="
                                    custom-btn
                                    text-decoration-none
                                    "
                                >
                                    View Details
                                </Link>

                            </Card.Body>

                        </Card>

                    </Col>

                ))}

            </Row>

        </div>

    );
}

export default Properties;