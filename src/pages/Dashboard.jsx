import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import API from "../services/api";

function Dashboard() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [servingQueue, setServingQueue] = useState("");
  const [copiedQueue, setCopiedQueue] = useState("");

  // FETCH ALL QUEUES
  const fetchQueues = async () => {
    try {
      setLoading(true);

      const response = await API.get("/queues");

      setQueues(response.data.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load queues.");
    } finally {
      setLoading(false);
    }
  };

  // SERVE NEXT CUSTOMER
  const serveNextCustomer = async (queueId) => {
    try {
      setServingQueue(queueId);

      const response = await API.put(
        `/queues/${queueId}/next`
      );

      console.log(response.data);

      await fetchQueues();
    } catch (err) {
      console.error(
        "Error serving next customer:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Unable to serve the next customer."
      );
    } finally {
      setServingQueue("");
    }
  };

  // COPY JOIN LINK
  const copyJoinLink = async (queueId) => {
    const joinUrl =
      `${window.location.origin}/join?queue=${queueId}`;

    try {
      await navigator.clipboard.writeText(joinUrl);

      setCopiedQueue(queueId);

      setTimeout(() => {
        setCopiedQueue("");
      }, 2000);
    } catch (err) {
      console.error("Unable to copy link:", err);
    }
  };

  // LOAD QUEUES
  useEffect(() => {
    fetchQueues();
  }, []);

  // TOTAL PEOPLE WAITING
  const totalWaiting = queues.reduce(
    (total, queue) =>
      total + (queue.peopleWaiting || 0),
    0
  );

  // CURRENTLY SERVING
  const totalServing = queues.reduce(
    (total, queue) =>
      total + (queue.currentToken || 0),
    0
  );

  return (
    <main className="dashboard-page">

      {/* HEADER */}
      <section className="dashboard-header">

        <div>
          <span className="section-label">
            JOINQ • ORGANIZER
          </span>

          <h1>Dashboard</h1>

          <p>
            Manage your queues and monitor waiting
            activity in one place.
          </p>
        </div>

        <Link to="/create">
          <button className="primary-button">
            + Create Queue
          </button>
        </Link>

      </section>


      {/* SUMMARY */}
      <section className="dashboard-stats">

        <div className="dashboard-stat">
          <span>Active Queues</span>

          <strong>
            {queues.length}
          </strong>

          <small>
            Queues created
          </small>
        </div>


        <div className="dashboard-stat">
          <span>People Waiting</span>

          <strong>
            {totalWaiting}
          </strong>

          <small>
            Across all queues
          </small>
        </div>


        <div className="dashboard-stat">
          <span>Currently Serving</span>

          <strong>
            {totalServing > 0
              ? `#${totalServing}`
              : "—"}
          </strong>

          <small>
            Latest token
          </small>
        </div>

      </section>


      {/* QUEUES */}
      <section className="dashboard-content">

        <div className="dashboard-section-heading">

          <div>
            <span className="section-label">
              OVERVIEW
            </span>

            <h2>Your Queues</h2>
          </div>


          <button
            type="button"
            className="refresh-button"
            onClick={fetchQueues}
          >
            ↻ Refresh
          </button>

        </div>


        {/* LOADING */}
        {loading && (
          <div className="dashboard-message">
            Loading your queues...
          </div>
        )}


        {/* ERROR */}
        {!loading && error && (
          <div className="dashboard-message error">
            {error}
          </div>
        )}


        {/* EMPTY */}
        {!loading &&
          !error &&
          queues.length === 0 && (

            <div className="empty-queues">

              <div className="empty-icon">
                +
              </div>

              <h3>
                No queues yet
              </h3>

              <p>
                Create your first digital queue
                to get started.
              </p>

              <Link to="/create">
                <button className="primary-button">
                  Create Your First Queue →
                </button>
              </Link>

            </div>
          )}


        {/* QUEUE CARDS */}
        {!loading &&
          !error &&
          queues.length > 0 && (

            <div className="queue-grid">

              {queues.map((queue) => {

                const joinUrl =
                  `${window.location.origin}/join?queue=${queue._id}`;

                return (
                  <div
                    className="dashboard-queue-card"
                    key={queue._id}
                  >

                    {/* CARD TOP */}
                    <div className="queue-card-top">

                      <div>

                        <span className="queue-category">
                          {queue.category}
                        </span>

                        <h3>
                          {queue.queueName}
                        </h3>

                      </div>


                      <span
                        className={`queue-status ${
                          queue.status?.toLowerCase()
                        }`}
                      >
                        ● {queue.status}
                      </span>

                    </div>


                    {/* ORGANIZATION */}
                    <p className="queue-organization">
                      {queue.organization}
                    </p>


                    {/* LOCATION */}
                    <p className="queue-location">
                      📍 {queue.location}
                    </p>


                    {/* QUEUE STATS */}
                    <div className="queue-card-stats">

                      <div>
                        <span>
                          Now Serving
                        </span>

                        <strong>
                          {queue.currentToken > 0
                            ? `#${queue.currentToken}`
                            : "—"}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Waiting
                        </span>

                        <strong>
                          {queue.peopleWaiting || 0}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Capacity
                        </span>

                        <strong>
                          {queue.maxCapacity}
                        </strong>
                      </div>

                    </div>


                    {/* QR CODE */}
                    <div className="queue-qr-section">

                      <div className="queue-qr">

                        <QRCodeCanvas
                          value={joinUrl}
                          size={150}
                          bgColor="#ffffff"
                          fgColor="#111111"
                          level="H"
                          includeMargin={true}
                        />

                      </div>


                      <div className="queue-qr-info">

                        <span className="section-label">
                          QUICK JOIN
                        </span>

                        <h4>
                          Scan to Join
                        </h4>

                        <p>
                          Customers can scan this QR
                          code to open the JoinQ page
                          for this queue.
                        </p>

                        <button
                          type="button"
                          className="queue-copy-button"
                          onClick={() =>
                            copyJoinLink(queue._id)
                          }
                        >
                          {copiedQueue === queue._id
                            ? "✓ Link Copied"
                            : "Copy Join Link"}
                        </button>

                      </div>

                    </div>


                    {/* ACTION BUTTONS */}
                    <div className="queue-card-actions">

                      <Link
                        to={`/status?id=${queue._id}`}
                        className="queue-view-button"
                      >
                        View Status
                      </Link>


                      <Link
                        to={`/join?queue=${queue._id}`}
                        className="queue-join-button"
                      >
                        Join Queue
                      </Link>


                      <button
                        type="button"
                        className="queue-next-button"
                        onClick={() =>
                          serveNextCustomer(queue._id)
                        }
                        disabled={
                          servingQueue === queue._id ||
                          queue.peopleWaiting <= 0
                        }
                      >
                        {servingQueue === queue._id
                          ? "Serving..."
                          : "Next Customer →"}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </section>

    </main>
  );
}

export default Dashboard;