export const mockStudents = [
  { id: 1, name: 'Aarav Sharma', phone: '+91 98765 43210', style: 'Hip-Hop', batch: 'Evening', status: 'Active' },
  { id: 2, name: 'Priya Patel', phone: '+91 87654 32109', style: 'Bollywood', batch: 'Morning', status: 'Active' },
  { id: 3, name: 'Rohan Gupta', phone: '+91 76543 21098', style: 'Contemporary', batch: 'Weekend', status: 'Inactive' },
  { id: 4, name: 'Ananya Singh', phone: '+91 65432 10987', style: 'Kathak', batch: 'Evening', status: 'Active' },
  { id: 5, name: 'Vikram Reddy', phone: '+91 54321 09876', style: 'Salsa', batch: 'Morning', status: 'Active' },
];

export const mockClasses = [
  { id: 1, name: 'Beginner Hip-Hop', trainer: 'Rahul Verma', time: '05:00 PM - 06:30 PM', level: 'Beginner', studentsCount: 15 },
  { id: 2, name: 'Advanced Bollywood', trainer: 'Neha Kapoor', time: '07:00 PM - 08:30 PM', level: 'Advanced', studentsCount: 22 },
  { id: 3, name: 'Kids Contemporary', trainer: 'Aditi Joshi', time: '10:00 AM - 11:30 AM', level: 'Beginner', studentsCount: 12 },
  { id: 4, name: 'Classical Kathak', trainer: 'Meera Rajput', time: '04:00 PM - 05:30 PM', level: 'Intermediate', studentsCount: 18 },
];

export const mockTrainers = [
  { id: 1, name: 'Rahul Verma', expertise: 'Hip-Hop, Urban', phone: '+91 91234 56780', classes: 3 },
  { id: 2, name: 'Neha Kapoor', expertise: 'Bollywood, Zumba', phone: '+91 81234 56781', classes: 4 },
  { id: 3, name: 'Aditi Joshi', expertise: 'Contemporary, Jazz', phone: '+91 71234 56782', classes: 2 },
  { id: 4, name: 'Meera Rajput', expertise: 'Kathak, Semi-Classical', phone: '+91 61234 56783', classes: 5 },
];

export const mockPayments = [
  { id: 'TRX-001', student: 'Aarav Sharma', amount: 2500, date: '2023-10-01', status: 'Paid', method: 'UPI' },
  { id: 'TRX-002', student: 'Priya Patel', amount: 3000, date: '2023-10-02', status: 'Paid', method: 'Card' },
  { id: 'TRX-003', student: 'Rohan Gupta', amount: 2500, date: '2023-10-05', status: 'Pending', method: '-' },
  { id: 'TRX-004', student: 'Ananya Singh', amount: 4000, date: '2023-10-06', status: 'Paid', method: 'Cash' },
  { id: 'TRX-005', student: 'Vikram Reddy', amount: 3000, date: '2023-10-10', status: 'Pending', method: '-' },
];

export const dashboardStats = {
  totalStudents: 145,
  activeClasses: 12,
  monthlyRevenue: 85000,
  upcomingBatches: 3,
};

export const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 59000 },
  { name: 'Jun', revenue: 75000 },
  { name: 'Jul', revenue: 85000 },
];
