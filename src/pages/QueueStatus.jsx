import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function QueueStatus() {
  const [queue, setQueue] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchStatus = async (queueId) => {
    try {
      const response = await API.get(`/queues/${queueId}`);

      setQueue(response.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load queue status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("joinQUser");

    if (!savedUser) {
      setError("You have not joined a queue yet.");
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    setUserData(parsedUser);

    fetchStatus(parsedUser.queueId);

    const interval = setInterval(() => {
      fetchStatus(parsedUser.queueId);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading queue status...</p>;
  }

  if (error) {
    return (
      <div className="status-container">
        <h1>Queue Status</h1>
        <p>{error}</p>

        <button onClick={() => navigate("/join")}>
          Join a Queue
        </button>
      </div>
    );
  }

  if (!queue || !userData) {
    return <p>No queue information available.</p>;
  }

  const peopleAhead = Math.max(
    userData.token - queue.currentToken - 1,
    0
  );

  const estimatedWait = peopleAhead * 5;

  return (
  <div className="status-page">

    {/* HEADER */}

    <div className="status-header">

      <span className="section-label">
        JOINQ • LIVE QUEUE
      </span>

      <h1>{queue.queueName}</h1>

      <p>
        {queue.organization} • {queue.location}
      </p>

      <span
        className={`status-pill ${
          queue.status?.toLowerCase()
        }`}
      >
        ● {queue.status}
      </span>

    </div>


    {/* MAIN TOKEN */}

    <div className="main-token-card">

      <span className="token-label">
        YOUR TOKEN
      </span>

      <div className="big-token">
        #{userData.token}
      </div>

      <p>
        Keep this number with you while you wait.
      </p>

    </div>


    {/* QUEUE INFORMATION */}

    <div className="status-grid">

      <div className="status-card">

        <span>NOW SERVING</span>

        <strong>
          #{queue.currentToken || 0}
        </strong>

        <small>
          Current token
        </small>

      </div>


      <div className="status-card">

        <span>PEOPLE AHEAD</span>

        <strong>
          {peopleAhead}
        </strong>

        <small>
          In front of you
        </small>

      </div>


      <div className="status-card">

        <span>ESTIMATED WAIT</span>

        <strong>
          {estimatedWait} min
        </strong>

        <small>
          Approximate time
        </small>

      </div>


      <div className="status-card">

        <span>PEOPLE WAITING</span>

        <strong>
          {queue.peopleWaiting || 0}
        </strong>

        <small>
          Currently in queue
        </small>

      </div>

    </div>


    {/* INFO */}

    <div className="status-info">

      <div>
        <span>Queue capacity</span>
        <strong>
          {queue.maxCapacity}
        </strong>
      </div>

      <div>
        <span>Location</span>
        <strong>
          {queue.location}
        </strong>
      </div>

      <div>
        <span>Category</span>
        <strong>
          {queue.category}
        </strong>
      </div>

    </div>


    {/* ACTIONS */}

    <div className="status-actions">

      <button
        className="refresh-status-button"
        onClick={() => fetchStatus(queue._id)}
      >
        ↻ Refresh Status
      </button>

      <button
        className="back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Dashboard
      </button>

    </div>


    <p className="status-footer">
      JoinQ updates this page automatically every 5 seconds.
    </p>

  </div>
);
}

export default QueueStatus;