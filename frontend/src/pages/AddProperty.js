import { 
    useState 
} from "react";

import axios from "axios";

import {
    Container,
    Form
} from "react-bootstrap";

function AddProperty() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        amenities: ""
    });

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!image) {
            setError("Please upload a property image");
            return;
        }

        setLoading(true);

        try {

            const token = localStorage.getItem(
                "token"
            );

            const data = new FormData();

            Object.keys(formData).forEach((key) => {

                data.append(key, formData[key]);

            });

            data.append("image", image);

            const res = await axios.post(
                "http://localhost:5000/api/properties/add",
                data,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );

            setSuccess(res.data.message);

            setFormData({
                title: "",
                description: "",
                price: "",
                location: "",
                bedrooms: "",
                bathrooms: "",
                amenities: ""
            });

            setImage(null);

        } catch (error) {

            setError(error.response?.data?.message || "Failed to add property");

        } finally {
            setLoading(false);
        }

    };

    return (

        <div style={{background: '#F7F7F7', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px'}}>

            <Container style={{maxWidth: '600px'}}>

                <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>

                    <h2 style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '32px'}}>
                        List Your Property
                    </h2>

                    {error && (
                        <div style={{
                            background: '#FFE5E5',
                            color: '#C5192D',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '0.85rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            background: '#E8F5E9',
                            color: '#31A24C',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '0.85rem'
                        }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Property Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Modern apartment in the city"
                                onChange={handleChange}
                                value={formData.title}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                placeholder="Tell guests about your property..."
                                rows={4}
                                onChange={handleChange}
                                value={formData.description}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Monthly Price (₱)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="25000"
                                onChange={handleChange}
                                value={formData.price}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                placeholder="Manila, Philippines"
                                onChange={handleChange}
                                value={formData.location}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Bedrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bedrooms"
                                placeholder="2"
                                onChange={handleChange}
                                value={formData.bedrooms}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Bathrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bathrooms"
                                placeholder="1"
                                onChange={handleChange}
                                value={formData.bathrooms}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Amenities</Form.Label>
                            <Form.Control
                                type="text"
                                name="amenities"
                                placeholder="WiFi, Kitchen, AC, TV"
                                onChange={handleChange}
                                value={formData.amenities}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Property Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setError("");
                                }}
                            />
                            <small style={{color: '#717171'}}>Upload a clear photo of your property</small>
                        </Form.Group>

                        <button 
                            type="submit"
                            className="custom-btn w-100"
                            style={{
                                padding: '12px',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Publishing...' : 'Publish Property'}
                        </button>

                    </form>

                </div>

            </Container>

        </div>

    );
}

export default AddProperty;