import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { analyticsData } from '../../../data/adminData';
import './AdminAnalytics.css';

const COLORS = ['#667eea', '#f5576c', '#4facfe', '#00f2fe', '#fa709a', '#fee140'];

const AdminAnalytics = () => {
  return (
    <div className="admin-analytics">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Detailed insights and performance metrics</p>
        </div>
        <select className="date-range-select">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      {/* Charts Grid */}
      <div className="analytics-grid">
        {/* Revenue Trend */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Revenue Trend</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#667eea" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Growth */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Student Growth</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="students" stroke="#f5576c" strokeWidth={3} dot={{ fill: '#f5576c', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Performance */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Top Courses by Students</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.courseProgress} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={100} />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="students" fill="#667eea" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Category Distribution</h3>
          </div>
          <div className="chart-container pie-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {analyticsData.categoryDistribution.map((cat, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-color" style={{ background: COLORS[index % COLORS.length] }}></span>
                  <span className="legend-label">{cat.name}</span>
                  <span className="legend-value">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="analytics-card full-width">
          <div className="card-header">
            <h3>Performance Metrics</h3>
          </div>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-label">Student Satisfaction</span>
                <span className="metric-value">92%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-label">Course Completion Rate</span>
                <span className="metric-value">78%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-label">Average Quiz Score</span>
                <span className="metric-value">85%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-label">Active Engagement</span>
                <span className="metric-value">67%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
