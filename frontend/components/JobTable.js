import React from 'react';

const JobTable = ({ jobs }) => {
  return (
    <table className="job-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={index}>
            <td>{job.job_name}</td>
            <td>{job.company_name}</td>
          </tr>
        ))}
      </tbody>
      
      {/* Styles */}
      <style jsx>{`
        .job-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .job-table th, .job-table td {
          border: 1px solid #dddddd;
          padding: 8px;
          text-align: left;
        }

        .job-table th {
          background-color: #f2f2f2;
        }
      `}</style>
    </table>
  );
};

export default JobTable;
