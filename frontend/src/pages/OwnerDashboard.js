import {
    useEffect,
    useState
} from "react";

import axios from "axios";

function OwnerDashboard() {

    const [bookings, setBookings] =
    useState([]);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

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

    };

    const updateStatus = async (
        bookingId,
        status
    ) => {

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

    };

    return (

        <div className="container mt-5">

            <h2>Owner Dashboard</h2>

            {bookings.map((booking) => (

                <div
                    key={booking._id}
                    className="card p-3 mb-3"
                >

                    <h4>
                        {booking.property.title}
                    </h4>

                    <p>
                        Tenant:
                        {" "}
                        {booking.tenant.name}
                    </p>

                    <p>
                        Status:
                        {" "}
                        {booking.status}
                    </p>

                    <button
                        className="btn btn-success me-2"
                        onClick={() =>
                            updateStatus(
                                booking._id,
                                "approved"
                            )
                        }
                    >
                        Approve
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            updateStatus(
                                booking._id,
                                "rejected"
                            )
                        }
                    >
                        Reject
                    </button>

                </div>

            ))}

        </div>

    );
}

export default OwnerDashboard;