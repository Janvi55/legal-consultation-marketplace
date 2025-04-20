
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CustomLoader } from '../../CustomLoader';

export const ViewAllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  // Fetch all Queries
  const getAllQueries = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/queries");
      setQueries(res.data.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllQueries();
  }, []);

   // Function to respond to a query
   const handleRespond = async (queryId) => {
    if (!responseText.trim()) {
      alert("Response cannot be empty.");
      return;
    }

    try {
      await axios.put(`/updateQuery/${queryId}`, {
        response: responseText,
        status: "Answered"
      });

      alert("Query responded successfully!");
      setResponseText(""); // Clear input field
      getAllQueries(); // Refresh list
    } catch (error) {
      console.error("Error responding to query:", error);
      alert("Failed to respond.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
    {isLoading && <CustomLoader />}
    <br />
    <h2>User Queries</h2>
    <table className="table table-dark">
      <thead>
        <tr>
          <th>User</th>
          <th>Query Text</th>
          <th>Status</th>
          <th>Response</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {queries?.map((query) => (
          <tr key={query._id}>
            <td>{query.userId
                      ? `${query.userId.firstName} ${query.userId.lastName}`
                      : "Unknown User"}</td>
            <td>{query.queryText}</td>
            <td>
              <span className={`badge ${query.status === "Answered" ? "bg-success" : "bg-warning"}`}>
                {query.status}
              </span>
            </td>
            <td>
              {query.status === "Answered" ? query.response : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter response..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
              )}
            </td>
            <td>
              {query.status === "Pending" && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleRespond(query._id)}
                >
                  Respond
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};