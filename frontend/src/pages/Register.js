import {
    useState
} from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

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

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const res =
            await axios.post(

                "http://localhost:5000/api/auth/register",

                formData

            );

            alert(res.data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response.data.message
            );

        }

    };

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="
                    form-control
                    mb-3
                    "
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="
                    form-control
                    mb-3
                    "
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="
                    form-control
                    mb-3
                    "
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="
                    form-control
                    mb-3
                    "
                    onChange={handleChange}
                >

                    <option value="tenant">
                        Tenant
                    </option>

                    <option value="owner">
                        Owner
                    </option>

                </select>

                <button
                    className="custom-btn"
                >
                    Register
                </button>

            </form>

        </div>

    );
}

export default Register;