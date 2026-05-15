import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import axios from "axios";

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

        return <h2>Loading...</h2>;

    }

    return (

        <div className="container mt-5">

            <img
                src={`http://localhost:5000/uploads/${property.image}`}
                alt=""
                width="100%"
                height="500"
                style={{
                    objectFit: "cover"
                }}
            />

            <h2 className="mt-4">
                {property.title}
            </h2>

            <p>{property.description}</p>

            <h4>
                ₱ {property.price}
            </h4>

            <p>
                {property.location}
            </p>

            <button
                className="btn btn-success"
                onClick={handleBooking}
            >
                Request Booking
            </button>

        </div>

    );
}

export default PropertyDetails;