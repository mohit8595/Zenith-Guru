import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './assets/Pages/Home.jsx';
import About from './assets/Pages/About.jsx';
import Contact from './assets/Pages/Contact.jsx';
import Courses from './assets/Pages/Courses.jsx';
import ClassPage from './assets/Pages/ClassPage.jsx';
import Login from './assets/Pages/Login.jsx';
import SignUp from './assets/Pages/SignUp.jsx';
import Profile from './assets/Pages/Profile.jsx';
import UpcomingBatches from './assets/Pages/UpcomingBatches.jsx';
import TestSeries from './assets/Pages/TestSeries.jsx';
import Blog from './assets/Pages/Blog.jsx';
import TuitionForm from './assets/Pages/TuitionForm.jsx';
import PDFs from './assets/Pages/PDFs.jsx';
import Videos from './assets/Pages/Videos.jsx';
import Header from './components/Header.jsx';
import BackButton from './components/BackButton.jsx';
import PDFViewer from './components/PDFViewer.jsx';
import VideoPlayerPage from './components/VideoPlayerPage.jsx';
import AdminLayout from './components/Admin/AdminLayout.jsx';
import AdminLogin from './assets/Pages/Admin/AdminLogin.jsx';
import AdminDashboard from './assets/Pages/Admin/AdminDashboard.jsx';
import AdminCourses from './assets/Pages/Admin/AdminCourses.jsx';
import AdminStudents from './assets/Pages/Admin/AdminStudents.jsx';
import AdminInstructors from './assets/Pages/Admin/AdminInstructors.jsx';
import AdminEnrollments from './assets/Pages/Admin/AdminEnrollments.jsx';
import AdminPayments from './assets/Pages/Admin/AdminPayments.jsx';
import AdminAnalytics from './assets/Pages/Admin/AdminAnalytics.jsx';
import AdminSettings from './assets/Pages/Admin/AdminSettings.jsx';

function App (){
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  
  useEffect(() => {
    // Hide Header and BackButton on admin routes
    if (location.pathname.startsWith('/admin')) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);

  return (
    <>
      {showHeader && <Header />}
      {showHeader && <BackButton />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/courses/class-:classNum' element={<ClassPage />} />
        <Route path="/upcoming-batches" element={<UpcomingBatches />} />
        <Route path="/test-series" element={<TestSeries />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tuition-form" element={<TuitionForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* PDF Routes */}
        <Route path="/pdfs" element={<PDFs />} />
        <Route path="/pdf/:id" element={<PDFViewer />} />
        
        {/* Video Routes */}
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:id" element={<VideoPlayerPage />} />
        
        {/* Admin Routes - wrapped with AdminLayout */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/instructors" element={<AdminInstructors />} />
          <Route path="/admin/enrollments" element={<AdminEnrollments />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
