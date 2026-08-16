import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateQueue() {
  const navigate = useNavigate();

  const [queueData, setQueueData] = useState({
    queueName: "",
    organization: "",
    category: "",
    location: "",
    description: "",
    date: "",
    time: "",
    maxCapacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setQueueData({
      ...queueData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !queueData.queueName ||
      !queueData.organization ||
      !queueData.category ||
      !queueData.location ||
      !queueData.date ||
      !queueData.time ||
      !queueData.maxCapacity
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/queues", {
        ...queueData,
        maxCapacity: Number(queueData.maxCapacity),
      });

      console.log("Queue created:", response.data);

      const createdQueue = response.data.data;

      /*
        Create the URL that the QR code will contain.

        Example:
        http://localhost:5173/join?queue=64abc123...
      */
      const joinUrl = `${window.location.origin}/join?queue=${createdQueue._id}`;

      /*
        Save the QR URL to the queue.
        The QR image itself will be generated/displayed
        on the Dashboard later.
      */
      await API.put(`/queues/${createdQueue._id}`, {
        qrCode: joinUrl,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to create the queue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-page">

      <section className="create-header">
        <span className="section-label">
          JOINQ • ORGANIZER
        </span>

        <h1>Create a Queue</h1>

        <p>
          Set up your digital queue and let people join without
          standing around.
        </p>
      </section>

      <section className="create-card">

        <form onSubmit={handleSubmit}>

          {/* Queue Name */}

          <div className="form-group">
            <label htmlFor="queueName">
              Queue Name <span>*</span>
            </label>

            <input
              id="queueName"
              type="text"
              name="queueName"
              placeholder="Eg. Symposium Registration"
              value={queueData.queueName}
              onChange={handleChange}
            />
          </div>

          {/* Organization */}

          <div className="form-group">
            <label htmlFor="organization">
              Organization <span>*</span>
            </label>

            <input
              id="organization"
              type="text"
              name="organization"
              placeholder="Eg. ABC College"
              value={queueData.organization}
              onChange={handleChange}
            />
          </div>

          {/* Category + Location */}

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="category">
                Category <span>*</span>
              </label>

              <select
                id="category"
                name="category"
                value={queueData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                <option value="Hospital">
                  Hospital
                </option>

                <option value="College">
                  College
                </option>

                <option value="Bank">
                  Bank
                </option>

                <option value="Event">
                  Event
                </option>

                <option value="Restaurant">
                  Restaurant
                </option>

                <option value="Government Office">
                  Government Office
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location <span>*</span>
              </label>

              <input
                id="location"
                type="text"
                name="location"
                placeholder="Eg. Main Auditorium"
                value={queueData.location}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Date + Time */}

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="date">
                Date <span>*</span>
              </label>

              <input
                id="date"
                type="date"
                name="date"
                value={queueData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">
                Opening Time <span>*</span>
              </label>

              <input
                id="time"
                type="time"
                name="time"
                value={queueData.time}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Capacity */}

          <div className="form-group">
            <label htmlFor="maxCapacity">
              Maximum Capacity <span>*</span>
            </label>

            <input
              id="maxCapacity"
              type="number"
              name="maxCapacity"
              min="1"
              placeholder="Eg. 50"
              value={queueData.maxCapacity}
              onChange={handleChange}
            />

            <small>
              Maximum number of people allowed in the queue.
            </small>
          </div>

          {/* Description */}

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Tell people what this queue is for..."
              value={queueData.description}
              onChange={handleChange}
            />
          </div>

          {/* Error */}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Submit */}

          <div className="form-footer">

            <button
              type="button"
              className="form-cancel"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="form-submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Queue →"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default CreateQueue;