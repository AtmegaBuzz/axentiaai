'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import {
  XCircle,
  LogOut,
  RefreshCw,
  Download,
  MessageCircle,
  ArrowUpDown,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Admin email is validated server-side via /api/admin/verify

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  submittedAt: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filters & sorting
  const [sortAsc, setSortAsc] = useState(false); // false = newest first
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const supabase = createClient();

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch('/api/admin/inquiries');
      if (!res.ok) {
        setFetchError('Failed to load inquiries');
      } else {
        const { inquiries: data } = await res.json();
        setInquiries(data ?? []);
      }
    } catch {
      setFetchError('Network error');
    }
    setLoading(false);
  }, []);

  // Check session on mount via server-side verification
  useEffect(() => {
    const check = async () => {
      const res = await fetch('/api/admin/verify');
      const { isAdmin } = await res.json();
      if (isAdmin) {
        setIsLoggedIn(true);
        fetchInquiries();
      }
      setCheckingSession(false);
    };
    check();
  }, [fetchInquiries]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError('Invalid credentials. Please try again.');
      setLoginLoading(false);
      return;
    }

    // Verify admin status server-side (email checked against private env var)
    const verifyRes = await fetch('/api/admin/verify');
    const { isAdmin } = await verifyRes.json();
    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoginError('Access denied. This portal is for admins only.');
      setLoginLoading(false);
      return;
    }

    setIsLoggedIn(true);
    setLoginLoading(false);
    fetchInquiries();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setInquiries([]);
  };

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let list = [...inquiries];

    // Date range filter
    if (dateFrom) {
      const from = new Date(dateFrom);
      from.setHours(0, 0, 0, 0);
      list = list.filter((q) => new Date(q.submittedAt) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      list = list.filter((q) => new Date(q.submittedAt) <= to);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q) ||
          (item.phone && item.phone.includes(q))
      );
    }

    // Sort
    list.sort((a, b) => {
      const diff = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      return sortAsc ? diff : -diff;
    });

    return list;
  }, [inquiries, dateFrom, dateTo, searchQuery, sortAsc]);

  const exportCSV = () => {
    const rows = [
      ['#', 'Name', 'Email', 'Phone', 'Message', 'Submitted At'],
      ...filtered.map((q, i) => [
        i + 1,
        q.name,
        q.email,
        q.phone || '',
        q.message,
        new Date(q.submittedAt).toLocaleString('en-IN'),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSearchQuery('');
  };

  const hasFilters = dateFrom || dateTo || searchQuery;

  // ── Loading ──
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Login ──
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image
              src="/brand/axentia-logo.png"
              alt="AxentiaAI"
              width={180}
              height={48}
              className="h-8 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-xl font-bold text-slate-900">Admin Portal</h1>
            <p className="text-slate-400 text-sm mt-1">Contact Inquiries Management</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-400 transition-colors"
                  placeholder="admin@axentiaai.in"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-400 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <XCircle className="w-4 h-4 shrink-0" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loginLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/brand/axentia-logo.png" alt="AxentiaAI" width={140} height={40} className="h-6 w-auto" priority />
            <div className="h-5 w-px bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{inquiries.length}</p>
              <p className="text-xs text-slate-400">Total Inquiries</p>
            </div>
          </div>
          {hasFilters && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="px-2.5 py-1 bg-brand-50 text-brand-600 font-semibold rounded-full">
                {filtered.length} matching
              </span>
              <button onClick={clearFilters} className="text-brand-500 hover:text-brand-700 font-semibold cursor-pointer">
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Filters toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
          <div className="px-6 py-4 flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, subject..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
              <span className="text-xs text-slate-400">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Sort toggle */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortAsc ? 'Oldest first' : 'Newest first'}
            </button>

            {/* Export */}
            {filtered.length > 0 && (
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Inquiries table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 grid grid-cols-12 gap-4">
            <span className="col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">#</span>
            <span className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</span>
            <span className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</span>
            <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</span>
            <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</span>
            <span className="col-span-1 text-xs font-semibold text-slate-400 uppercase tracking-wider" />
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="w-7 h-7 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Loading inquiries...</p>
            </div>
          ) : fetchError ? (
            <div className="p-10 text-center">
              <p className="text-red-500 text-sm font-semibold mb-1">Failed to load inquiries</p>
              <p className="text-slate-400 text-xs">{fetchError}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <MessageCircle className="w-8 h-8 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">
                {inquiries.length === 0 ? 'No inquiries yet.' : 'No inquiries match your filters.'}
              </p>
              {inquiries.length === 0 && (
                <p className="text-slate-300 text-xs mt-1">Contact form submissions will appear here.</p>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((q, i) => (
                <div key={q.id} className="hover:bg-slate-50 transition-colors">
                  <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
                    {/* # */}
                    <div className="col-span-1">
                      <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center">
                        <span className="text-xs font-bold text-brand-600">{i + 1}</span>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="col-span-3">
                      <span className="text-sm font-semibold text-slate-900 truncate block">{q.name}</span>
                    </div>

                    {/* Email */}
                    <div className="col-span-3">
                      <span className="text-sm text-slate-600 truncate block">{q.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="col-span-2">
                      <span className="text-sm text-slate-500 truncate block">{q.phone || '—'}</span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <span className="text-xs text-slate-400">
                        {new Date(q.submittedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="block text-[10px] text-slate-300">
                        {new Date(q.submittedAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Expand toggle */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all cursor-pointer"
                      >
                        {expandedId === q.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded message */}
                  {expandedId === q.id && (
                    <div className="px-6 pb-4">
                      <div className="ml-11 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</p>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{q.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
