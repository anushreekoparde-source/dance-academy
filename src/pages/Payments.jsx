import { useState } from 'react';
import { Download, Search, AlertCircle, FileText } from 'lucide-react';
import { mockPayments } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { showToast } from '../components/Toast';

export default function Payments() {
  const [payments, setPayments] = useState(mockPayments);
  const [search, setSearch] = useState('');

  const filteredPayments = payments.filter(p => 
    p.student.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    showToast('Payment report exported successfully!', 'success');
  };

  const markAsPaid = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'Paid', method: 'Cash' } : p));
    showToast(`Transaction ${id} marked as paid.`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Payments & Fees</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Track student fee payments and transaction history.</p>
        </div>
        <button 
          onClick={handleExport}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center bg-violet-600 hover:bg-violet-700"
        >
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Total Collected</h3>
            <div className="p-2 bg-emerald-500/20 rounded-lg"><FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-color)]">{formatCurrency(125000)}</p>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">+12% from last month</p>
        </div>
        <div className="card bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-rose-600 dark:text-rose-400">Pending Dues</h3>
            <div className="p-2 bg-rose-500/20 rounded-lg"><AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" /></div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-color)]">{formatCurrency(18500)}</p>
          <p className="text-sm font-medium text-rose-600 dark:text-rose-400 mt-2">14 students pending</p>
        </div>
      </div>

      <div className="card overflow-hidden !p-0 border border-[var(--border-color)] shadow-sm">
        <div className="p-5 border-b border-[var(--border-color)] bg-[var(--bg-color)]/30">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by student or transaction ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 bg-[var(--surface-color)] shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[var(--surface-color)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] bg-[var(--surface-color)]">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[var(--bg-color)] transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-violet-500">{payment.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[var(--text-color)]">{payment.student}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--text-muted)]">{payment.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[var(--text-color)]">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--text-muted)]">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      payment.status === 'Paid' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {payment.status === 'Pending' ? (
                      <button 
                        onClick={() => markAsPaid(payment.id)}
                        className="text-xs font-bold text-emerald-500 hover:text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors px-3 py-1.5">
                        Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
