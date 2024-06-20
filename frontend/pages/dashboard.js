import { useState } from 'react';
import axios from 'axios';
import JobTable from '../components/JobTable';

export default function Dashboard() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/jobs?title=${jobTitle}`);
      setJobs(response.data);
    } catch (error) {
      alert('Error fetching jobs!');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Job Search Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Search Job Title"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </nav>
      <div className="container">
        {jobs.length > 0 ? (
          <JobTable jobs={jobs} />
        ) : (
          <p>No jobs found. Try a different search term.</p>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #232f3e;
          color: #ffffff;
          padding: 15px;
        }

        .navbar h1 {
          font-size: 24px;
          margin: 0;
        }

        .search-container {
          display: flex;
          align-items: center;
        }

        .search-input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
          width: 300px;
        }

        .search-button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4caf50;
          color: #ffffff;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .search-button:hover {
          background-color: #45a049;
        }

        .container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        p {
          text-align: center;
          margin-top: 20px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
