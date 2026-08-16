import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero-left">

          <div className="hero-badge">
            ✦ Smart Queue Management
          </div>

          <h1>
            Skip the crowd.
            <br />
            <span>Just JoinQ.</span>
          </h1>

          <p className="hero-description">
            Create digital queues, let people join remotely,
            and manage waiting lines in real time — all from
            one simple platform.
          </p>

          <div className="hero-buttons">

            <Link to="/create">
              <button className="primary-button">
                Create a Queue →
              </button>
            </Link>

            <Link to="/join">
              <button className="secondary-button">
                Join a Queue
              </button>
            </Link>

          </div>

          <div className="hero-points">

            <div className="hero-point">
              <span className="hero-point-icon">✓</span>
              No physical waiting
            </div>

            <div className="hero-point">
              <span className="hero-point-icon">◷</span>
              Real-time updates
            </div>

            <div className="hero-point">
              <span className="hero-point-icon">✓</span>
              Simple & efficient
            </div>

          </div>

        </div>

        {/* LIVE QUEUE */}
        <div className="live-card">

          <div className="live-header">

            <span className="live-title">
              LIVE QUEUE
            </span>

            <span className="live-status">
              Open
            </span>

          </div>

          <div className="serving-box">

            <span>Now Serving</span>

            <strong className="serving-number">
              #18
            </strong>

          </div>

          <div className="queue-numbers">

            <div className="queue-number">
              <div className="number-circle">16</div>
              <div className="queue-label">Done</div>
            </div>

            <div className="queue-number">
              <div className="number-circle">17</div>
              <div className="queue-label">Done</div>
            </div>

            <div className="queue-number">
              <div className="number-circle active">18</div>
              <div className="queue-label">Now</div>
            </div>

            <div className="queue-number">
              <div className="number-circle">19</div>
              <div className="queue-label">Waiting</div>
            </div>

            <div className="queue-number">
              <div className="number-circle">20</div>
              <div className="queue-label">Waiting</div>
            </div>

          </div>

          <div className="live-stats">

            <div className="live-stat">
              <strong>2</strong>
              <span>People ahead</span>
            </div>

            <div className="live-stat">
              <strong>~10 min</strong>
              <span>Estimated wait</span>
            </div>

            <div className="live-stat">
              <strong>#21</strong>
              <span>Your token</span>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">

          <div className="feature-icon">ϟ</div>

          <div>
            <h3>Real-Time Updates</h3>

            <p>
              Track queue movement and waiting positions
              without constantly standing in line.
            </p>
          </div>

        </div>

        <div className="feature-card">

          <div className="feature-icon">▣</div>

          <div>
            <h3>Join From Anywhere</h3>

            <p>
              Users can join a queue digitally and
              continue with their day while they wait.
            </p>
          </div>

        </div>

        <div className="feature-card">

          <div className="feature-icon">▥</div>

          <div>
            <h3>Easy Management</h3>

            <p>
              Organizers can monitor queues, manage
              capacity and keep everything organized.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">

        <div className="how-inner">

          <div>

            <div className="section-label">
              How It Works
            </div>

            <h2 className="how-title">
              Three steps.
              <br />
              Zero standing around.
            </h2>

          </div>

          <div className="steps">

            <div className="step">

              <div className="step-number">
                01
              </div>

              <h3>Create</h3>

              <p>
                An organizer creates a digital queue
                with the required details and capacity.
              </p>

            </div>

            <div className="step">

              <div className="step-number">
                02
              </div>

              <h3>Join</h3>

              <p>
                Users discover a queue or scan its
                QR code and receive their digital token.
              </p>

            </div>

            <div className="step">

              <div className="step-number">
                03
              </div>

              <h3>Wait Smarter</h3>

              <p>
                Users monitor their position and
                estimated waiting time.
              </p>

            </div>

          </div>

          <div className="cta">

            <small>✦ READY TO GET STARTED?</small>

            <h3>
              Turn waiting time
              into productive time.
            </h3>

            <p>
              Create your first digital queue
              with JoinQ.
            </p>

            <Link to="/create">
              <button>
                Create Your Queue →
              </button>
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Home;