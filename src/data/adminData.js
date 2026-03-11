// Dummy Data for Admin Dashboard

export const dashboardStats = {
  totalStudents: 2456,
  totalCourses: 48,
  totalInstructors: 24,
  totalRevenue: 125680,
  revenueChange: 12.5,
  studentChange: 8.2,
  courseChange: 4.1,
  instructorChange: 2.3
};

export const recentEnrollments = [
  {
    id: 1,
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@email.com',
    course: 'JEE Advanced 2025',
    date: '2025-01-18',
    amount: 9999,
    status: 'Completed'
  },
  {
    id: 2,
    studentName: 'Priya Singh',
    studentEmail: 'priya.singh@email.com',
    course: 'NEET Foundation',
    date: '2025-01-18',
    amount: 7999,
    status: 'Pending'
  },
  {
    id: 3,
    studentName: 'Amit Kumar',
    studentEmail: 'amit.kumar@email.com',
    course: 'Class 10 Science',
    date: '2025-01-17',
    amount: 5999,
    status: 'Completed'
  },
  {
    id: 4,
    studentName: 'Sneha Gupta',
    studentEmail: 'sneha.gupta@email.com',
    course: 'Math Mastery',
    date: '2025-01-17',
    amount: 4999,
    status: 'Completed'
  },
  {
    id: 5,
    studentName: 'Vikram Patel',
    studentEmail: 'vikram.patel@email.com',
    course: 'Physics Premium',
    date: '2025-01-16',
    amount: 8999,
    status: 'Pending'
  }
];

export const courses = [
  {
    id: 1,
    title: 'JEE Advanced 2025 Complete Course',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300',
    instructor: 'D.V. Dwivedi',
    category: 'JEE',
    price: 9999,
    students: 1234,
    rating: 4.8,
    status: 'Published',
    duration: '6 months'
  },
  {
    id: 2,
    title: 'NEET Foundation Batch 2025',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300',
    instructor: 'Priya Sharma',
    category: 'NEET',
    price: 7999,
    students: 892,
    rating: 4.7,
    status: 'Published',
    duration: '8 months'
  },
  {
    id: 3,
    title: 'Class 10 Science & Math',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
    instructor: 'Saloni Kumari',
    category: 'Class 10',
    price: 5999,
    students: 567,
    rating: 4.9,
    status: 'Published',
    duration: '10 months'
  },
  {
    id: 4,
    title: 'English Communication Course',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=300',
    instructor: 'Amit Singh',
    category: 'Language',
    price: 3999,
    students: 234,
    rating: 4.6,
    status: 'Draft',
    duration: '3 months'
  },
  {
    id: 5,
    title: 'Physics Premium Batch',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300',
    instructor: 'Saloni Kumari',
    category: 'Physics',
    price: 8999,
    students: 445,
    rating: 4.8,
    status: 'Published',
    duration: '5 months'
  }
];

export const students = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    enrolledCourses: 3,
    totalSpent: 22997,
    joinDate: '2024-06-15',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya.singh@email.com',
    phone: '+91 9876543211',
    enrolledCourses: 2,
    totalSpent: 15998,
    joinDate: '2024-07-20',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 9876543212',
    enrolledCourses: 1,
    totalSpent: 5999,
    joinDate: '2024-08-10',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit'
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    phone: '+91 9876543213',
    enrolledCourses: 4,
    totalSpent: 34996,
    joinDate: '2024-05-01',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha'
  },
  {
    id: 5,
    name: 'Vikram Patel',
    email: 'vikram.patel@email.com',
    phone: '+91 9876543214',
    enrolledCourses: 2,
    totalSpent: 14998,
    joinDate: '2024-09-05',
    status: 'Inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram'
  }
];

export const instructors = [
  {
    id: 1,
    name: 'D.V. Dwivedi',
    email: 'dv.dwivedi@zenithguru.com',
    phone: '+91 9876543001',
    subject: 'Mathematics',
    experience: '15+ Years',
    qualification: 'M.Sc, B.Ed',
    courses: 8,
    students: 5000,
    rating: 4.9,
    status: 'Approved',
    joinDate: '2020-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DV',
    earnings: 250000
  },
  {
    id: 2,
    name: 'Saloni Kumari',
    email: 'saloni.kumari@zenithguru.com',
    phone: '+91 9876543002',
    subject: 'Physics',
    experience: '12+ Years',
    qualification: 'BCA, M.Sc',
    courses: 6,
    students: 3500,
    rating: 4.8,
    status: 'Approved',
    joinDate: '2021-03-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saloni',
    earnings: 180000
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya.sharma@zenithguru.com',
    phone: '+91 9876543003',
    subject: 'Chemistry',
    experience: '10+ Years',
    qualification: 'M.Sc, B.Ed',
    courses: 5,
    students: 4200,
    rating: 4.9,
    status: 'Approved',
    joinDate: '2021-06-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS',
    earnings: 165000
  },
  {
    id: 4,
    name: 'Amit Singh',
    email: 'amit.singh@zenithguru.com',
    phone: '+91 9876543004',
    subject: 'English',
    experience: '8+ Years',
    qualification: 'M.A, B.Ed',
    courses: 4,
    students: 2800,
    rating: 4.7,
    status: 'Pending',
    joinDate: '2024-01-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmitS',
    earnings: 0
  }
];

export const enrollments = [
  { id: 1, studentId: 1, courseId: 1, date: '2024-06-20', status: 'Active' },
  { id: 2, studentId: 1, courseId: 3, date: '2024-07-15', status: 'Active' },
  { id: 3, studentId: 2, courseId: 2, date: '2024-08-10', status: 'Active' },
  { id: 4, studentId: 3, courseId: 3, date: '2024-09-01', status: 'Completed' },
  { id: 5, studentId: 4, courseId: 1, date: '2024-05-20', status: 'Active' },
  { id: 6, studentId: 4, courseId: 2, date: '2024-06-15', status: 'Active' },
  { id: 7, studentId: 5, courseId: 4, date: '2024-10-01', status: 'Inactive' }
];

export const analyticsData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000, students: 120 },
    { month: 'Feb', revenue: 52000, students: 145 },
    { month: 'Mar', revenue: 48000, students: 132 },
    { month: 'Apr', revenue: 61000, students: 178 },
    { month: 'May', revenue: 55000, students: 156 },
    { month: 'Jun', revenue: 67000, students: 189 },
    { month: 'Jul', revenue: 72000, students: 210 },
    { month: 'Aug', revenue: 78000, students: 225 },
    { month: 'Sep', revenue: 69000, students: 198 },
    { month: 'Oct', revenue: 85000, students: 245 },
    { month: 'Nov', revenue: 92000, students: 268 },
    { month: 'Dec', revenue: 98000, students: 289 }
  ],
  courseProgress: [
    { name: 'JEE Advanced', progress: 85, students: 1234 },
    { name: 'NEET Foundation', progress: 72, students: 892 },
    { name: 'Class 10 Science', progress: 90, students: 567 },
    { name: 'English Communication', progress: 45, students: 234 },
    { name: 'Physics Premium', progress: 68, students: 445 }
  ],
  categoryDistribution: [
    { name: 'JEE', value: 35 },
    { name: 'NEET', value: 28 },
    { name: 'Class 9-10', value: 20 },
    { name: 'Language', value: 10 },
    { name: 'Others', value: 7 }
  ]
};

export const payments = [
  { id: 1, studentName: 'Rahul Sharma', transactionId: 'TXN001', amount: 9999, date: '2025-01-18', method: 'UPI', status: 'Completed' },
  { id: 2, studentName: 'Priya Singh', transactionId: 'TXN002', amount: 7999, date: '2025-01-18', method: 'Card', status: 'Pending' },
  { id: 3, studentName: 'Amit Kumar', transactionId: 'TXN003', amount: 5999, date: '2025-01-17', method: 'UPI', status: 'Completed' },
  { id: 4, studentName: 'Sneha Gupta', transactionId: 'TXN004', amount: 4999, date: '2025-01-17', method: 'Card', status: 'Completed' },
  { id: 5, studentName: 'Vikram Patel', transactionId: 'TXN005', amount: 8999, date: '2025-01-16', method: 'UPI', status: 'Failed' },
  { id: 6, studentName: 'Anjali Reddy', transactionId: 'TXN006', amount: 12999, date: '2025-01-15', method: 'UPI', status: 'Completed' },
  { id: 7, studentName: 'Rohit Singh', transactionId: 'TXN007', amount: 7999, date: '2025-01-15', method: 'Card', status: 'Completed' },
  { id: 8, studentName: 'Kavita Joshi', transactionId: 'TXN008', amount: 5999, date: '2025-01-14', method: 'UPI', status: 'Pending' }
];
