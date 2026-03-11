import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Award,
  Activity,
  Zap,
  Star,
  Video,
  FileText,
  MessageCircle,
  ShoppingCart
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { dashboardStats, recentEnrollments, analyticsData } from '../../../data/adminData';
import VideoUploadModal from '../../../components/VideoUploadModal';
import PDFUploadModal from '../../../components/PDFUploadModal';
import './AdminDashboard.css';

const StatCard = ({ icon: Icon, title, value, change, changeType, iconBg, delay }) => (
  <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
    <div className="stat-icon" style={{ background: iconBg }}>
      <Icon size={24} />
      <div className="stat-icon-glow"></div>
    </div>
    <div className="stat-content">
      <span className="stat-title">{title}</span>
      <h3 className="stat-value">{value}</h3>
      <div className={`stat-change ${changeType}`}>
        {changeType === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{change}% this month</span>
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, title, description, color, onClick }) => (
  <div className="quick-action" style={{ borderColor: color, cursor: 'pointer' }} onClick={onClick}>
    <div className="quick-action-icon" style={{ background: `${color}20`, color: color }}>
      <Icon size={20} />
    </div>
    <div className="quick-action-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    revenue: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Upload modal states
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [showPDFUploadModal, setShowPDFUploadModal] = useState(false);

  useEffect(() => {
    // Animate numbers
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedStats({
        students: Math.floor(dashboardStats.totalStudents * progress),
        courses: Math.floor(dashboardStats.totalCourses * progress),
        instructors: Math.floor(dashboardStats.totalInstructors * progress),
        revenue: Math.floor(dashboardStats.totalRevenue * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    // Update time every second
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(timeTimer);
    };
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const quickActions = [
    { icon: BookOpen, title: 'Add New Course', description: 'Create a new course', color: '#667eea', action: () => {} },
    { icon: Users, title: 'Add Student', description: 'Register new student', color: '#10b981', action: () => {} },
    { icon: Calendar, title: 'Schedule Batch', description: 'Create new batch', color: '#f59e0b', action: () => {} },
    { icon: Award, title: 'Generate Certificate', description: 'Create certificates', color: '#ef4444', action: () => {} },
    { icon: Video, title: 'Upload Video', description: 'Add course video', color: '#8b5cf6', action: () => setShowVideoUploadModal(true) },
    { icon: FileText, title: 'Add PDF', description: 'Upload study material', color: '#ec4899', action: () => setShowPDFUploadModal(true) }
  ];

  const handleVideoUploaded = (newVideo) => {
    console.log('Video uploaded:', newVideo);
    setShowVideoUploadModal(false);
  };

  const handlePDFUploaded = (newPDF) => {
    console.log('PDF uploaded:', newPDF);
    setShowPDFUploadModal(false);
  };

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>Welcome back, Admin! 👋</h1>
            <p>Here's what's happening with your platform today.</p>
          </div>
          <div className="welcome-clock">
            <div className="clock-time">{currentTime.toLocaleTimeString()}</div>
            <div className="clock-date">{formatDate(currentTime)}</div>
          </div>
        </div>
        <div className="welcome-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          icon={Users}
          title="Total Students"
          value={animatedStats.students.toLocaleString()}
          change={dashboardStats.studentChange}
          changeType="up"
          iconBg="linear-gradient(135deg, #667eea, #764ba2)"
          delay={0}
        />
        <StatCard
          icon={BookOpen}
          title="Total Courses"
          value={animatedStats.courses}
          change={dashboardStats.courseChange}
          changeType="up"
          iconBg="linear-gradient(135deg, #f093fb, #f5576c)"
          delay={100}
        />
        <StatCard
          icon={GraduationCap}
          title="Total Instructors"
          value={animatedStats.instructors}
          change={dashboardStats.instructorChange}
          changeType="up"
          iconBg="linear-gradient(135deg, #4facfe, #00f2fe)"
          delay={200}
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={formatCurrency(animatedStats.revenue)}
          change={dashboardStats.revenueChange}
          changeType="up"
          iconBg="linear-gradient(135deg, #fa709a, #fee140)"
          delay={300}
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2><Zap size={20} /> Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <QuickAction 
              key={index} 
              {...action} 
              onClick={action.action}
            />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Revenue Chart */}
        <div className="chart-card revenue-chart">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} />
              <h3>Revenue Overview</h3>
            </div>
            <select className="chart-select">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 30 Days</option>
            </select>
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
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#667eea"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="chart-card category-chart">
          <div className="chart-header">
            <div className="chart-title">
              <Star size={20} />
              <h3>Course Categories</h3>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="category-legend">
              {analyticsData.categoryDistribution.map((cat, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-color" style={{ background: cat.color }}></span>
                  <span className="legend-label">{cat.name}</span>
                  <span className="legend-value">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress & Recent Enrollments */}
      <div className="bottom-row">
        {/* Course Progress */}
        <div className="chart-card progress-chart">
          <div className="chart-header">
            <div className="chart-title">
              <TrendingUp size={20} />
              <h3>Course Progress</h3>
            </div>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="progress-list">
            {analyticsData.courseProgress.map((course, index) => (
              <div key={index} className="progress-item">
                <div className="progress-info">
                  <span className="progress-name">{course.name}</span>
                  <span className="progress-students">{course.students} students</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-percentage">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="chart-card enrollments-card">
          <div className="chart-header">
            <div className="chart-title">
              <Clock size={20} />
              <h3>Recent Enrollments</h3>
            </div>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="enrollments-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.slice(0, 5).map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>
                      <div className="student-info">
                        <span className="student-name">{enrollment.studentName}</span>
                        <span className="student-email">{enrollment.studentEmail}</span>
                      </div>
                    </td>
                    <td>{enrollment.course}</td>
                    <td className="amount">{formatCurrency(enrollment.amount)}</td>
                    <td>
                      <span className={`status ${enrollment.status.toLowerCase()}`}>
                        {enrollment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Students Chart */}
      <div className="chart-card students-chart">
        <div className="chart-header">
          <div className="chart-title">
            <Users size={20} />
            <h3>Student Enrollment Trend</h3>
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="students" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Video Upload Modal */}
      <VideoUploadModal 
        isOpen={showVideoUploadModal}
        onClose={() => setShowVideoUploadModal(false)}
        onVideoUploaded={handleVideoUploaded}
      />

      {/* PDF Upload Modal */}
      <PDFUploadModal 
        isOpen={showPDFUploadModal}
        onClose={() => setShowPDFUploadModal(false)}
        onPDFUploaded={handlePDFUploaded}
      />
    </div>
  );
};

export default AdminDashboard;

