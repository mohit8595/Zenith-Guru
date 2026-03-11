import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { payments as initialPayments } from '../../../data/adminData';
import './AdminPayments.css';

const ITEMS_PER_PAGE = 5;

const AdminPayments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate totals
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const successfulPayments = payments.filter(p => p.status === 'Completed').length;
  const pendingPayments = payments.filter(p => p.status === 'Pending').length;

  return (
    <div className="admin-payments">
      <div className="page-header">
        <div>
          <h1>Payments</h1>
          <p>Track and manage all payment transactions</p>
        </div>
        <button className="export-btn">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Payment Stats */}
      <div className="payment-stats">
        <div className="payment-stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Successful</span>
            <span className="stat-value">{successfulPayments}</span>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingPayments}</span>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="stat-icon trend">
            <TrendingUp size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">This Month</span>
            <span className="stat-value">{formatCurrency(totalAmount * 0.3)}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-table-card">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <span className="transaction-id">{payment.transactionId}</span>
                </td>
                <td>{payment.studentName}</td>
                <td className="amount">{formatCurrency(payment.amount)}</td>
                <td>
                  <div className="payment-method">
                    <CreditCard size={16} />
                    <span>{payment.method}</span>
                  </div>
                </td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${payment.status.toLowerCase()}`}>
                    {payment.status === 'Completed' && <CheckCircle size={14} />}
                    {payment.status === 'Pending' && <Clock size={14} />}
                    {payment.status === 'Failed' && <XCircle size={14} />}
                    {payment.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn download" title="Download Receipt">
                      <Download size={16} />
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
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredPayments.length)} of {filteredPayments.length} entries
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

export default AdminPayments;
