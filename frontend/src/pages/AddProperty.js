import { useState } from "react";
import axios from "axios";

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

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

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

            alert(res.data.message);

        } catch (error) {

            alert(error.response.data.message);

        }

    };

    return (

        <div className="container mt-5">

            <h2>Add Property</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="amenities"
                    placeholder="Amenities"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />

                <button className="btn btn-primary">
                    Add Property
                </button>

            </form>

        </div>

    );
}

export default AddProperty;