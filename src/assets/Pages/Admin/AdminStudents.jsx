import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { students as initialStudents } from '../../../data/adminData';
import './AdminStudents.css';

const ITEMS_PER_PAGE = 5;

const AdminStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="admin-students">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage all registered students</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="students-table-card">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Contact</th>
              <th>Enrolled Courses</th>
              <th>Total Spent</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <img src={student.avatar} alt={student.name} className="student-avatar" />
                    <div className="student-details">
                      <span className="student-name">{student.name}</span>
                      <span className="student-email">{student.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <span className="contact-item">
                      <Mail size={14} /> {student.email}
                    </span>
                    <span className="contact-item">
                      <Phone size={14} /> {student.phone}
                    </span>
                  </div>
                </td>
                <td>{student.enrolledCourses}</td>
                <td className="amount">{formatCurrency(student.totalSpent)}</td>
                <td>{new Date(student.joinDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <span className="page-info">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length} entries
          </span>
          <div className="page-buttons">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
