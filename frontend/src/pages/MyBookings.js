import {
    useEffect,
    useState
} from "react";

import axios from "axios";

function MyBookings() {

    const [bookings, setBookings] =
    useState([]);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

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

    };

    return (

        <div className="container mt-5">

            <h2>My Bookings</h2>

            {bookings.map((booking) => (

                <div
                    key={booking._id}
                    className="card p-3 mb-3"
                >

                    <h4>
                        {booking.property.title}
                    </h4>

                    <p>
                        Status:
                        {" "}
                        {booking.status}
                    </p>

                </div>

            ))}

        </div>

    );
}

export default MyBookings;