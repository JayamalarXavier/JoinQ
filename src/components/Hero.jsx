import { Link } from "react-router-dom";

function Hero() {

    return (

        <section className="hero">

            <h1>Smart Digital Queue Management</h1>

            <p>

                Create digital queues, invite users instantly,
                generate QR codes, monitor waiting time in real time,
                and eliminate physical waiting lines.

            </p>

            <div className="hero-buttons">

                <Link to="/create">

                    <button>Create Queue</button>

                </Link>

                <Link to="/join">

                    <button className="secondary">

                        Join Queue

                    </button>

                </Link>

            </div>

        </section>

    )

}

export default Hero;