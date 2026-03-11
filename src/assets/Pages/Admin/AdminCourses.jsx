import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { courses as initialCourses } from '../../../data/adminData';
import './AdminCourses.css';

const ITEMS_PER_PAGE = 5;

const AdminCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
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
    <div className="admin-courses">
      <div className="page-header">
        <div>
          <h1>Manage Courses</h1>
          <p>View and manage all your courses</p>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="courses-table-card">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr key={course.id}>
                <td>
                  <div className="course-info">
                    <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                    <div className="course-details">
                      <span className="course-title">{course.title}</span>
                      <span className="course-category">{course.category} • {course.duration}</span>
                    </div>
                  </div>
                </td>
                <td>{course.instructor}</td>
                <td className="price">{formatCurrency(course.price)}</td>
                <td>{course.students}</td>
                <td>
                  <div className="rating">
                    <span>⭐</span> {course.rating}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View">
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-btn edit" 
                      title="Edit"
                      onClick={() => {
                        setEditingCourse(course);
                        setShowModal(true);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete"
                      onClick={() => handleDelete(course.id)}
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
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)} of {filteredCourses.length} entries
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Course Title</label>
                  <input type="text" placeholder="Enter course title" defaultValue={editingCourse?.title} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Instructor</label>
                  <input type="text" placeholder="Enter instructor name" defaultValue={editingCourse?.instructor} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select defaultValue={editingCourse?.category}>
                    <option>Select Category</option>
                    <option>JEE</option>
                    <option>NEET</option>
                    <option>Class 9-10</option>
                    <option>Language</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (INR)</label>
                  <input type="number" placeholder="Enter price" defaultValue={editingCourse?.price} />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" placeholder="e.g., 6 months" defaultValue={editingCourse?.duration} />
                </div>
              </div>
              <div className="form-group">
                <label>Thumbnail URL</label>
                <input type="url" placeholder="Enter thumbnail URL" defaultValue={editingCourse?.thumbnail} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select defaultValue={editingCourse?.status}>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
