import {
    Link
} from "react-router-dom";

function Home() {

    return (

        <div className="hero-section">

            <div>

                <h1 className="hero-title">

                    Find Your Dream Home

                </h1>

                <p className="hero-text">

                    Modern rentals made simple.

                </p>

                <Link
                    to="/properties"
                    className="
                    custom-btn
                    text-decoration-none
                    "
                >
                    Explore Properties
                </Link>

            </div>

        </div>

    );
}

export default Home;