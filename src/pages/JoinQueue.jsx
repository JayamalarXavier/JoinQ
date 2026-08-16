import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

function JoinQueue() {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();

  // FETCH AVAILABLE QUEUES
  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await API.get("/queues");

        setQueues(response.data.data || []);

        const queueId = searchParams.get("queue");

        if (queueId) {
          setSelectedQueue(queueId);
        }
      } catch (error) {
        console.error("Error fetching queues:", error);
        setMessage("Unable to load queues.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, [searchParams]);

  // JOIN QUEUE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedQueue || !name.trim() || !phone.trim()) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    setJoining(true);
    setMessage("");

    try {
      const response = await API.post(
        `/queues/${selectedQueue}/join`,
        {
          name: name.trim(),
          phone: phone.trim(),
        }
      );

      console.log("Join response:", response.data);

      const queueData = response.data.data;

      // SAVE USER QUEUE INFORMATION
      const queueInfo = {
        queueId: selectedQueue,
        queueName: queueData.queueName,
        name: name.trim(),
        phone: phone.trim(),
        token: queueData.token,
      };

      sessionStorage.setItem(
        "joinQUser",
        JSON.stringify(queueInfo)
      );

      // SUCCESS MESSAGE
      setMessage(
        `Successfully joined ${queueData.queueName}! Your token is #${queueData.token}.`
      );

      // CLEAR FORM
      setName("");
      setPhone("");

      // REFRESH QUEUES
      const updatedQueues = await API.get("/queues");

      setQueues(updatedQueues.data.data || []);

    } catch (error) {
      console.error("Error joining queue:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to join queue. Please try again."
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <main>

      {/* HERO */}
      <section className="join-hero">

        <div className="join-hero-content">

          <div className="join-eyebrow">
            ✦ Simple & Smart Queue Management
          </div>

          <h1>
            Join a Queue
          </h1>

          <div className="join-title-line"></div>

          <p>
            Select a queue and enter your details to get your token.
            No standing in long lines. Just join, relax, and wait your turn.
          </p>

        </div>

        {/* VISUAL */}
        <div className="join-visual">

          <div className="queue-people">

            <div className="person person-one">
              <div className="person-head"></div>
              <div className="person-body"></div>
            </div>

            <div className="person person-two">
              <div className="person-head"></div>
              <div className="person-body"></div>
            </div>

            <div className="person person-three">
              <div className="person-head"></div>
              <div className="person-body"></div>
            </div>

          </div>

          <div className="token-machine">

            <div className="machine-screen">
              <span>YOUR TOKEN</span>
              <strong>#12</strong>
              <small>THANKQ!</small>
            </div>

          </div>

          <div className="plant">
            🌿
          </div>

        </div>

      </section>


      {/* FORM CARD */}
      <section className="join-form-card">

        {/* SELECT QUEUE */}
        <div className="join-section">

          <div className="join-section-title">

            <span className="join-section-number">
              1
            </span>

            <div>
              <h2>Select Queue</h2>
              <p>
                Choose the queue you want to join.
              </p>
            </div>

          </div>

          {loading ? (

            <div className="join-loading">
              Loading available queues...
            </div>

          ) : queues.filter(
              (queue) => queue.status === "Open"
            ).length === 0 ? (

            <div className="join-empty">
              No open queues are currently available.
            </div>

          ) : (

            <select
              className="join-select"
              value={selectedQueue}
              onChange={(e) =>
                setSelectedQueue(e.target.value)
              }
            >

              <option value="">
                Select a queue
              </option>

              {queues
                .filter(
                  (queue) => queue.status === "Open"
                )
                .map((queue) => (

                  <option
                    key={queue._id}
                    value={queue._id}
                  >
                    {queue.queueName} — {queue.organization}
                  </option>

                ))}

            </select>

          )}

        </div>


        <div className="join-divider"></div>


        {/* USER DETAILS */}
        <div className="join-section">

          <div className="join-section-title">

            <span className="join-section-number">
              2
            </span>

            <div>
              <h2>Your Details</h2>
              <p>
                Enter your details to receive your token.
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="join-input-grid">

              {/* NAME */}
              <div className="join-input-group">

                <label htmlFor="name">
                  Your Name
                </label>

                <div className="join-input-wrapper">

                  <span className="input-icon">
                    ♙
                  </span>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>

              </div>


              {/* PHONE */}
              <div className="join-input-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="join-input-wrapper">

                  <span className="input-icon">
                    ☎
                  </span>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />

                </div>

              </div>

            </div>


            <div className="join-divider"></div>


            {/* SUBMIT */}
            <button
              type="submit"
              className="join-submit"
              disabled={joining || loading}
            >

              {joining
                ? "Joining Queue..."
                : "Join Queue →"}

            </button>

          </form>

        </div>

      </section>


      {/* MESSAGE */}
      {message && (

        <div
          className={`join-message ${
            message.includes("Successfully")
              ? "success"
              : "error"
          }`}
        >

          <span>
            {message.includes("Successfully")
              ? "✓"
              : "!"}
          </span>

          <p>
            {message}
          </p>

        </div>

      )}


      {/* REMINDER */}
      <div className="join-reminder">

        <span className="reminder-icon">
          i
        </span>

        <p>
          Please make sure your details are correct.
          You will receive your token for the selected queue.
        </p>

      </div>

    </main>
  );
}

export default JoinQueue;