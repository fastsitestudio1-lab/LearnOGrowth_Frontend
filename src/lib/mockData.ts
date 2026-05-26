import type { Student, Teacher, Assignment, LeaveRequest, Notification } from '@/types';

export const MOCK_STUDENTS: Student[] = [
  { id: 'ST-001', name: 'Arjun Kumar', grade: '10th', section: 'A', rollNo: '01', gpa: 3.8, attendance: 92, status: 'Active', parentName: 'Ramesh Kumar', email: 'arjun@nexus.edu' },
  { id: 'ST-002', name: 'Priya Sharma', grade: '10th', section: 'A', rollNo: '02', gpa: 4.0, attendance: 98, status: 'Active', parentName: 'Suresh Sharma', email: 'priya@nexus.edu' },
  { id: 'ST-003', name: 'Rohan Mehta', grade: '10th', section: 'B', rollNo: '03', gpa: 2.8, attendance: 64, status: 'Warning', parentName: 'Vijay Mehta', email: 'rohan@nexus.edu' },
  { id: 'ST-004', name: 'Sneha Patel', grade: '11th', section: 'A', rollNo: '04', gpa: 3.5, attendance: 88, status: 'Active', parentName: 'Harish Patel', email: 'sneha@nexus.edu' },
  { id: 'ST-005', name: 'Kiran Rao', grade: '11th', section: 'B', rollNo: '05', gpa: 3.2, attendance: 76, status: 'Active', parentName: 'Mohan Rao', email: 'kiran@nexus.edu' },
  { id: 'ST-006', name: 'Divya Nair', grade: '12th', section: 'A', rollNo: '06', gpa: 3.9, attendance: 95, status: 'Active', parentName: 'Sanjay Nair', email: 'divya@nexus.edu' },
  { id: 'ST-007', name: 'Aakash Singh', grade: '12th', section: 'B', rollNo: '07', gpa: 2.5, attendance: 58, status: 'Warning', parentName: 'Rajesh Singh', email: 'aakash@nexus.edu' },
  { id: 'ST-008', name: 'Meera Iyer', grade: '9th', section: 'A', rollNo: '08', gpa: 3.7, attendance: 91, status: 'Active', parentName: 'Venkat Iyer', email: 'meera@nexus.edu' },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'TC-001', name: 'Dr. Anita Desai', subject: 'Mathematics', department: 'Science', email: 'anita@nexus.edu', employeeId: 'EMP-001', classesCount: 4, studentsCount: 120 },
  { id: 'TC-002', name: 'Prof. Ravi Shankar', subject: 'Physics', department: 'Science', email: 'ravi@nexus.edu', employeeId: 'EMP-002', classesCount: 3, studentsCount: 90 },
  { id: 'TC-003', name: 'Ms. Lakshmi Krishnan', subject: 'English', department: 'Humanities', email: 'lakshmi@nexus.edu', employeeId: 'EMP-003', classesCount: 5, studentsCount: 150 },
  { id: 'TC-004', name: 'Mr. Subramaniam', subject: 'Chemistry', department: 'Science', email: 'subra@nexus.edu', employeeId: 'EMP-004', classesCount: 3, studentsCount: 90 },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'A-001', title: 'Quadratic Equations Practice', subject: 'Mathematics', dueDate: '2025-06-02', status: 'Pending', totalMarks: 50, description: 'Solve problems from chapter 4, exercises 4.1 to 4.5.' },
  { id: 'A-002', title: 'Newton\'s Laws Lab Report', subject: 'Physics', dueDate: '2025-05-28', status: 'Submitted', totalMarks: 100, description: 'Write a detailed lab report on the Newton\'s Laws experiment.' },
  { id: 'A-003', title: 'Essay: Industrial Revolution', subject: 'History', dueDate: '2025-05-25', status: 'Late', totalMarks: 30, description: 'Write 1000-word essay on the impact of the Industrial Revolution.' },
  { id: 'A-004', title: 'Periodic Table Quiz', subject: 'Chemistry', dueDate: '2025-06-05', status: 'Graded', marks: 45, totalMarks: 50, description: 'Study all elements up to atomic number 20.' },
  { id: 'A-005', title: 'Short Story Writing', subject: 'English', dueDate: '2025-06-08', status: 'Pending', totalMarks: 40, description: 'Write a 500-word short story on the theme: "Courage".' },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'LR-001', studentName: 'Rohan Mehta', studentId: 'ST-003', type: 'Medical', from: '2025-05-26', to: '2025-05-28', reason: 'Fever and throat infection', status: 'Pending', class: '10-B' },
  { id: 'LR-002', studentName: 'Kiran Rao', studentId: 'ST-005', type: 'Personal', from: '2025-05-30', to: '2025-05-30', reason: 'Family function', status: 'Pending', class: '11-B' },
  { id: 'LR-003', studentName: 'Aakash Singh', studentId: 'ST-007', type: 'Emergency', from: '2025-05-22', to: '2025-05-23', reason: 'Family emergency', status: 'Approved', class: '12-B' },
  { id: 'LR-004', studentName: 'Priya Sharma', studentId: 'ST-002', type: 'Medical', from: '2025-05-18', to: '2025-05-19', reason: 'Dental surgery', status: 'Approved', class: '10-A' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'N-001', title: 'Assignment Due Tomorrow', message: 'Quadratic Equations Practice is due on June 2nd.', type: 'warning', time: '2 hours ago', read: false },
  { id: 'N-002', title: 'Leave Request Approved', message: 'Your leave for May 22–23 has been approved.', type: 'success', time: '5 hours ago', read: false },
  { id: 'N-003', title: 'Exam Schedule Released', message: 'Final exams are scheduled from June 15–25.', type: 'info', time: '1 day ago', read: true },
  { id: 'N-004', title: 'Low Attendance Warning', message: 'Your attendance in Chemistry is below 75%.', type: 'error', time: '2 days ago', read: true },
  { id: 'N-005', title: 'Grade Posted', message: 'Your Periodic Table Quiz has been graded: 45/50.', type: 'success', time: '3 days ago', read: true },
  { id: 'N-006', title: 'New Assignment Added', message: 'Short Story Writing assignment has been posted.', type: 'info', time: '3 days ago', read: true },
];

export const ATTENDANCE_WEEKLY = [
  { day: 'Mon', present: 118, absent: 7 },
  { day: 'Tue', present: 122, absent: 3 },
  { day: 'Wed', present: 115, absent: 10 },
  { day: 'Thu', present: 120, absent: 5 },
  { day: 'Fri', present: 108, absent: 17 },
];

export const PERFORMANCE_DATA = [
  { subject: 'Math', avg: 78, class: 82 },
  { subject: 'Physics', avg: 71, class: 75 },
  { subject: 'Chemistry', avg: 80, class: 77 },
  { subject: 'English', avg: 85, class: 83 },
  { subject: 'History', avg: 68, class: 72 },
];

export const STUDENT_MARKS = [
  { month: 'Jan', marks: 72 },
  { month: 'Feb', marks: 78 },
  { month: 'Mar', marks: 74 },
  { month: 'Apr', marks: 81 },
  { month: 'May', marks: 85 },
  { month: 'Jun', marks: 79 },
];

export const FEE_COLLECTION = [
  { month: 'Jan', collected: 185000, pending: 15000 },
  { month: 'Feb', collected: 192000, pending: 8000 },
  { month: 'Mar', collected: 178000, pending: 22000 },
  { month: 'Apr', collected: 195000, pending: 5000 },
  { month: 'May', collected: 188000, pending: 12000 },
];
