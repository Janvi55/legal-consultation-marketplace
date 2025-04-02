// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import '../../assets/css/lawyerdirectory.css'; // Import the CSS file

// const LawyerDirectory = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch lawyer data
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/lawyer/getalllawyers")
//       .then((response) => {
//         setLawyers(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching lawyers:", error);
//       });
//   }, []);

//   // Filter lawyers based on search
//   const filteredLawyers = lawyers.filter((lawyer) =>
//     `${lawyer.userId?.firstName} ${lawyer.userId?.lastName} ${lawyer.specialization}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="lawyer-directory">
//       <h2>Lawyer Directory</h2>
      
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search lawyers by name or specialization..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-bar"
//       />

//       <div className="lawyer-list">
//         {filteredLawyers.length > 0 ? (
//           filteredLawyers.map((lawyer) => (
//             <div key={lawyer._id} className="lawyer-card">
//               <h3>{lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
//               <p><strong>Specialization:</strong> {lawyer.specialization}</p>
//               <p><strong>Email:</strong> {lawyer.userId?.email || "Not Available"}</p>
//               <p><strong>Phone:</strong> {lawyer.userId?.phone || "Not Available"}</p>
//             </div>
//           ))
//         ) : (
//           <p>No lawyers found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LawyerDirectory;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/lawyerdirectory.css"; // Import the CSS file

const LawyerDirectory = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch lawyer data
  useEffect(() => {
    axios
      .get("http://localhost:3000/lawyer/")
      .then((response) => {
        setLawyers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching lawyers:", error);
      });
  }, []);

  // Filter lawyers based on search
  const filteredLawyers = lawyers.filter((lawyer) =>
    `${lawyer.userId?.firstName} ${lawyer.userId?.lastName} ${lawyer.specialization}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lawyer-directory">
      <h2>Lawyer Directory</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search lawyers by name or specialization..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="lawyer-list">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <div key={lawyer._id} className="lawyer-card">
              <h3>{lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
              <p><strong>Specialization:</strong> {lawyer.specialization}</p>
              <p><strong>Email:</strong> {lawyer.userId?.email || "Not Available"}</p>
              <p><strong>Phone:</strong> {lawyer.userId?.phone || "Not Available"}</p>

              {/* View Profile Button */}
              <Link to={`/lawyer/${lawyer._id}`} className="profile-button">
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p>No lawyers found.</p>
        )}
      </div>
    </div>
  );
};

export default LawyerDirectory;

