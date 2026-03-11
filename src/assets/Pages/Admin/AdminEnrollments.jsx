import React, { useState } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout';
import './AdminEnrollments.css';

const AdminEnrollments = () => {
  const [enrollments] = useState([
    { id: 1, studentName: 'John Doe', course: 'Mathematics', date: '2024-01-15', status: 'Active' },
    { id: 2, studentName: 'Jane Smith', course: 'Physics', date: '2024-01-14', status: 'Active' },
    { id: 3, studentName: 'Bob Johnson', course: 'Chemistry', date: '2024-01-13', status: 'Completed' },
    { id: 4, studentName: 'Alice Brown', course: 'Biology', date: '2024-01-12', status: 'Active' },
    { id: 5, studentName: 'Charlie Wilson', course: 'Mathematics', date: '2024-01-11', status: 'Pending' },
  ]);

  return (
    <AdminLayout>
      <div className="enrollments-container">
        <div className="page-header">
          <h1>Enrollments Management</h1>
          <button className="add-btn">Add New Enrollment</button>
        </div>

        <div className="enrollments-stats">
          <div className="stat-card">
            <h3>Total Enrollments</h3>
            <p className="stat-number">156</p>
          </div>
          <div className="stat-card">
            <h3>Active Students</h3>
            <p className="stat-number">89</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">45</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number">22</p>
          </div>
        </div>

        <div className="enrollments-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>{enrollment.id}</td>
                  <td>{enrollment.studentName}</td>
                  <td>{enrollment.course}</td>
                  <td>{enrollment.date}</td>
                  <td>
                    <span className={`status ${enrollment.status.toLowerCase()}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEnrollments;
