import {
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    Form
} from "react-bootstrap";

function Register() {

    const navigate =
    useNavigate();

    const [formData, setFormData] =
    useState({

        name: "",

        email: "",

        password: "",

        role: "tenant"

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

        setError("");

    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res =
            await axios.post(

                "http://localhost:5000/api/auth/register",

                formData

            );

            alert(res.data.message);

            navigate("/login");

        } catch (error) {

            setError(error.response?.data?.message || "Registration failed. Please try again.");

        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="auth-container">

            <div className="auth-form">

                <div style={{textAlign: 'center', marginBottom: '32px'}}>
                    <h2 style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px'}}>Create Account</h2>
                    <p style={{color: '#717171'}}>Join our community today</p>
                </div>

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

                <form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Account Type</Form.Label>
                        <Form.Select
                            name="role"
                            onChange={handleChange}
                            value={formData.role}
                        >

                            <option value="tenant">
                                Tenant (Looking to rent)
                            </option>

                            <option value="owner">
                                Owner (Listing properties)
                            </option>

                        </Form.Select>
                    </Form.Group>

                    <button
                        type="submit"
                        className="custom-btn w-100"
                        style={{
                            padding: '12px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                </form>

                <div style={{textAlign: 'center', color: '#717171'}}>
                    Already have an account? <Link to="/login" style={{color: '#FF385C', fontWeight: '600', textDecoration: 'none'}}>Sign in</Link>
                </div>

            </div>

        </div>

    );
}

export default Register;