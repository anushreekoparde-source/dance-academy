import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Award } from 'lucide-react';
import { mockCourses } from '../data/courses';

export default function UserDashboard() {
  const { user, enrolledCourses } = useAuth();

  const enrolledCoursesData = mockCourses.filter(c => enrolledCourses.includes(c.id));

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="card bg-gradient-to-br from-violet-600 to-fuchsia-600 border-none text-white overflow-hidden relative">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold backdrop-blur-md border-2 border-white/30 shrink-0">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.name || 'Student'}!</h1>
            <p className="text-white/80 text-lg">You have 2 classes coming up this week. Keep up the rhythm!</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
            <h2 className="text-xl font-bold text-[var(--text-color)]">My Classes</h2>
            <span className="bg-violet-500/10 text-violet-500 text-xs font-bold px-2 py-0.5 rounded-full">{enrolledCoursesData.length}</span>
          </div>
          <div className="space-y-3">
            {enrolledCoursesData.length > 0 ? enrolledCoursesData.map((course) => (
              <div key={course.id} className="p-4 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] hover:border-violet-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[var(--text-color)] text-lg">{course.name}</h3>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-lg border border-emerald-500/20">Active</span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center text-sm text-[var(--text-muted)] font-medium">
                    <Clock className="w-4 h-4 mr-2 text-violet-500" /> {course.schedule}
                  </div>
                  <div className="flex items-center text-sm text-[var(--text-muted)] font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-rose-500" /> {course.location}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-6">
                <p className="text-[var(--text-muted)] font-medium">You haven't enrolled in any courses yet.</p>
                <a href="/user/courses" className="inline-block mt-3 px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-bold shadow-md hover:-translate-y-0.5 transition-transform">Browse Courses</a>
              </div>
            )}
          </div>
        </div>

        <div className="card space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-color)] border-b border-[var(--border-color)] pb-3">Recent Achievements</h2>
          <div className="p-6 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] text-center">
            <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-[var(--text-color)] text-lg mb-1">Perfect Attendance!</h3>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-4">You attended all classes in October.</p>
            <button className="text-violet-500 text-sm font-semibold hover:text-violet-600 transition-colors">View Certificate</button>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-4">
            <div className="p-2 bg-blue-500 text-white rounded-lg shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-blue-600 dark:text-blue-400">Next Due Date</h4>
              <p className="text-sm text-blue-500/80 font-medium mt-1">Monthly fee of ₹2500 is due on Nov 5th.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
