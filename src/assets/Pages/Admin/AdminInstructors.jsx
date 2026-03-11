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
  Trash2,
  Check,
  X,
  BookOpen,
  Users,
  DollarSign
} from 'lucide-react';
import { instructors as initialInstructors } from '../../../data/adminData';
import './AdminInstructors.css';

const ITEMS_PER_PAGE = 5;

const AdminInstructors = () => {
  const [instructors, setInstructors] = useState(initialInstructors);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || instructor.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE);
  const paginatedInstructors = filteredInstructors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApprove = (id) => {
    setInstructors(instructors.map(i => 
      i.id === id ? { ...i, status: 'Approved' } : i
    ));
  };

  const handleReject = (id) => {
    setInstructors(instructors.map(i => 
      i.id === id ? { ...i, status: 'Rejected' } : i
    ));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="admin-instructors">
      <div className="page-header">
        <div>
          <h1>Instructors</h1>
          <p>Manage all instructors and their courses</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="instructors-grid">
        {paginatedInstructors.map((instructor) => (
          <div key={instructor.id} className="instructor-card">
            <div className="instructor-header">
              <img src={instructor.avatar} alt={instructor.name} className="instructor-avatar" />
              <div className="instructor-status">
                <span className={`status-badge ${instructor.status.toLowerCase()}`}>
                  {instructor.status}
                </span>
              </div>
            </div>
            
            <div className="instructor-body">
              <h3>{instructor.name}</h3>
              <span className="instructor-subject">{instructor.subject}</span>
              
              <div className="instructor-meta">
                <div className="meta-item">
                  <BookOpen size={16} />
                  <span>{instructor.courses} Courses</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{instructor.students} Students</span>
                </div>
                <div className="meta-item">
                  <span className="rating">⭐ {instructor.rating}</span>
                </div>
              </div>

              <div className="instructor-stats">
                <div className="stat">
                  <span className="stat-label">Experience</span>
                  <span className="stat-value">{instructor.experience}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Qualification</span>
                  <span className="stat-value">{instructor.qualification}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Earnings</span>
                  <span className="stat-value">{formatCurrency(instructor.earnings)}</span>
                </div>
              </div>

              <div className="instructor-contact">
                <span><Mail size={14} /> {instructor.email}</span>
                <span><Phone size={14} /> {instructor.phone}</span>
              </div>
            </div>

            <div className="instructor-actions">
              {instructor.status === 'Pending' ? (
                <div className="approval-buttons">
                  <button 
                    className="approve-btn"
                    onClick={() => handleApprove(instructor.id)}
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleReject(instructor.id)}
                  >
                    <X size={16} /> Reject
                  </button>
                </div>
              ) : (
                <div className="action-buttons">
                  <button className="action-btn view" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn assign" title="Assign Courses">
                    <BookOpen size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="page-info">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredInstructors.length)} of {filteredInstructors.length} entries
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
  );
};

export default AdminInstructors;
