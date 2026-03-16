'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle2, XCircle, Users, Clock, LogOut, RefreshCw, Mail, Download, Building2 } from 'lucide-react';

const ADMIN_EMAIL = 'admin@axentiaai.in';

interface ForumUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  forum_approved: boolean;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  source: string;
  subscribed_at: string;
}

interface EnterpriseInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  submitted_at: string;
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2);
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState<ForumUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [activeTab, setActiveTab] = useState<'forum' | 'subscribers' | 'inquiries'>('forum');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [subscribersError, setSubscribersError] = useState('');
  const [inquiries, setInquiries] = useState<EnterpriseInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [inquiriesError, setInquiriesError] = useState('');
  const [expandedInquiry, setExpandedInquiry] = useState<string | null>(null);

  const supabase = createClient();

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    setFetchError('');
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setFetchError(error.message);
    } else if (data) {
      // Normalise: forum_approved may not exist yet if migration hasn't run
      setUsers(data.map((u) => ({ ...u, forum_approved: u.forum_approved ?? false })));
    }
    setLoadingUsers(false);
  }, [supabase]);

  const fetchInquiries = useCallback(async () => {
    setLoadingInquiries(true);
    setInquiriesError('');
    const { data, error } = await supabase
      .from('enterprise_inquiries')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) {
      setInquiriesError(error.message);
    } else if (data) {
      setInquiries(data);
    }
    setLoadingInquiries(false);
  }, [supabase]);

  const exportInquiriesCSV = () => {
    const rows = [
      ['#', 'Name', 'Email', 'Company', 'Message', 'Submitted At'],
      ...inquiries.map((q, i) => [
        i + 1,
        q.name,
        q.email,
        q.company,
        q.message,
        new Date(q.submitted_at).toLocaleString('en-IN'),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enterprise-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const rows = [
      ['#', 'Email', 'Source', 'Subscribed At'],
      ...subscribers.map((s, i) => [
        i + 1,
        s.email,
        s.source || 'footer',
        new Date(s.subscribed_at).toLocaleString('en-IN'),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fetchSubscribers = useCallback(async () => {
    setLoadingSubscribers(true);
    setSubscribersError('');
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    if (error) {
      setSubscribersError(error.message);
    } else if (data) {
      setSubscribers(data);
    }
    setLoadingSubscribers(false);
  }, [supabase]);

  // Check if already logged in as admin
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === ADMIN_EMAIL) {
        setIsLoggedIn(true);
        fetchUsers();
        fetchSubscribers();
        fetchInquiries();
      }
      setCheckingSession(false);
    };
    check();
  }, [supabase, fetchUsers]);

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

    if (data.user?.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      setLoginError('Access denied. This portal is for admins only.');
      setLoginLoading(false);
      return;
    }

    setIsLoggedIn(true);
    setLoginLoading(false);
    fetchUsers();
    fetchSubscribers();
    fetchInquiries();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUsers([]);
    setSubscribers([]);
    setInquiries([]);
  };

  const handleApprove = async (userId: string) => {
    setActionLoading(userId);
    await supabase.from('profiles').update({ forum_approved: true }).eq('id', userId);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, forum_approved: true } : u));
    setActionLoading(null);
  };

  const handleRevoke = async (userId: string) => {
    setActionLoading(userId);
    await supabase.from('profiles').update({ forum_approved: false }).eq('id', userId);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, forum_approved: false } : u));
    setActionLoading(null);
  };

  const filteredUsers = users.filter((u) => {
    if (filter === 'approved') return u.forum_approved;
    if (filter === 'pending') return !u.forum_approved;
    return true;
  });

  const approvedCount = users.filter((u) => u.forum_approved).length;
  const pendingCount = users.filter((u) => !u.forum_approved).length;

  // Loading session check
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
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
            <p className="text-slate-400 text-sm mt-1">Forum Management</p>
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
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 mt-2"
              >
                {loginLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* ── SIDEBAR ── */}
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-100">
          <Image src="/brand/axentia-logo.png" alt="AxentiaAI" width={140} height={40} className="h-6 w-auto" priority />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Admin Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Sections</p>

          {([
            { id: 'forum',       label: 'Forum Members',         icon: Users,      count: users.length,       color: 'text-slate-500'  },
            { id: 'subscribers', label: 'Newsletter Subscribers', icon: Mail,       count: subscribers.length, color: 'text-violet-500' },
            { id: 'inquiries',   label: 'Enterprise Inquiries',   icon: Building2,  count: inquiries.length,   color: 'text-blue-500'   },
          ] as const).map(({ id, label, icon: Icon, count, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === id
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${activeTab === id ? 'text-brand-600' : color}`} />
              <span className="flex-1 text-left truncate">{label}</span>
              {count > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  activeTab === id ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-slate-100 space-y-1">
          <button
            onClick={() => { fetchUsers(); fetchSubscribers(); fetchInquiries(); }}
            disabled={loadingUsers || loadingSubscribers || loadingInquiries}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 shrink-0 ${(loadingUsers || loadingSubscribers || loadingInquiries) ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top header */}
        <header className="bg-white border-b border-slate-200 px-8 h-14 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-bold text-slate-800">
            {activeTab === 'forum' && 'Forum Members'}
            {activeTab === 'subscribers' && 'Newsletter Subscribers'}
            {activeTab === 'inquiries' && 'Enterprise Inquiries'}
          </h1>
          {/* Stats row */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Users className="w-3.5 h-3.5" />
              <span><span className="font-bold text-slate-700">{users.length}</span> users</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5" />
              <span><span className="font-bold text-violet-600">{subscribers.length}</span> subscribers</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Building2 className="w-3.5 h-3.5" />
              <span><span className="font-bold text-blue-600">{inquiries.length}</span> inquiries</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">

        {/* Forum Members Table */}
        {activeTab === 'forum' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-base font-bold text-slate-900">Forum Members</h2>
                <p className="text-xs text-slate-400 mt-0.5">Approve or revoke users&apos; ability to post and comment</p>
              </div>
              {/* Filter tabs */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                {(['all', 'pending', 'approved'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                      filter === f
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {f} {f === 'all' ? `(${users.length})` : f === 'approved' ? `(${approvedCount})` : `(${pendingCount})`}
                  </button>
                ))}
              </div>
            </div>

            {loadingUsers ? (
              <div className="p-16 text-center">
                <div className="w-7 h-7 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading users...</p>
              </div>
            ) : fetchError ? (
              <div className="p-10 text-center">
                <p className="text-red-500 text-sm font-semibold mb-1">Failed to load users</p>
                <p className="text-slate-400 text-xs">{fetchError}</p>
                <p className="text-slate-300 text-xs mt-3">Make sure you have run the database migration SQL in Supabase.</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-16 text-center">
                <p className="text-slate-400 text-sm">{users.length === 0 ? 'No users have signed up yet.' : 'No users match this filter.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 text-sm font-bold shrink-0 overflow-hidden">
                      {u.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        getInitials(u.full_name)
                      )}
                    </div>

                    {/* Name + date */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {u.full_name || <span className="text-slate-400 italic">Unnamed User</span>}
                      </p>
                      <p className="text-xs text-slate-400">
                        Joined {new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Status badge */}
                    <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      u.forum_approved
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {u.forum_approved ? (
                        <><CheckCircle2 className="w-3 h-3" /> Approved</>
                      ) : (
                        <><Clock className="w-3 h-3" /> Pending</>
                      )}
                    </span>

                    {/* Action */}
                    {u.forum_approved ? (
                      <button
                        onClick={() => handleRevoke(u.id)}
                        disabled={actionLoading === u.id}
                        className="shrink-0 px-4 py-1.5 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {actionLoading === u.id ? '...' : 'Revoke'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(u.id)}
                        disabled={actionLoading === u.id}
                        className="shrink-0 px-4 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-200 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {actionLoading === u.id ? '...' : 'Approve'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscribers Table */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-base font-bold text-slate-900">Newsletter Subscribers</h2>
                <p className="text-xs text-slate-400 mt-0.5">Emails collected from the footer subscribe form</p>
              </div>
              {subscribers.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-violet-600 border border-violet-200 hover:bg-violet-50 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>

            {loadingSubscribers ? (
              <div className="p-16 text-center">
                <div className="w-7 h-7 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading subscribers...</p>
              </div>
            ) : subscribersError ? (
              <div className="p-10 text-center">
                <p className="text-red-500 text-sm font-semibold mb-1">Failed to load subscribers</p>
                <p className="text-slate-400 text-xs">{subscribersError}</p>
                <p className="text-slate-300 text-xs mt-3">Make sure you have run the subscribers table SQL in Supabase.</p>
              </div>
            ) : subscribers.length === 0 ? (
              <div className="p-16 text-center">
                <Mail className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No subscribers yet.</p>
                <p className="text-slate-300 text-xs mt-1">Emails will appear here once people subscribe from the footer.</p>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 grid grid-cols-12 gap-4">
                  <span className="col-span-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</span>
                  <span className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Source</span>
                  <span className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Subscribed</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {subscribers.map((s, i) => (
                    <div key={s.id} className="px-6 py-3.5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
                      <div className="col-span-6 flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-violet-500">{i + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-800 truncate">{s.email}</span>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 capitalize">
                          {s.source || 'footer'}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-xs text-slate-400">
                          {new Date(s.subscribed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Enterprise Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-base font-bold text-slate-900">Enterprise Inquiries</h2>
                <p className="text-xs text-slate-400 mt-0.5">Submitted via the &quot;Work With Axentia.AI&quot; form</p>
              </div>
              {inquiries.length > 0 && (
                <button
                  onClick={exportInquiriesCSV}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>

            {loadingInquiries ? (
              <div className="p-16 text-center">
                <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading inquiries...</p>
              </div>
            ) : inquiriesError ? (
              <div className="p-10 text-center">
                <p className="text-red-500 text-sm font-semibold mb-1">Failed to load inquiries</p>
                <p className="text-slate-400 text-xs">{inquiriesError}</p>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-16 text-center">
                <Building2 className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No inquiries yet.</p>
                <p className="text-slate-300 text-xs mt-1">Enterprise form submissions will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {inquiries.map((q, i) => (
                  <div key={q.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-500">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                          <span className="text-sm font-bold text-slate-900">{q.name}</span>
                          <span className="text-xs text-slate-400">{q.email}</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
                            <Building2 className="w-3 h-3" />{q.company}
                          </span>
                          <span className="text-xs text-slate-300 ml-auto">
                            {new Date(q.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <button
                          onClick={() => setExpandedInquiry(expandedInquiry === q.id ? null : q.id)}
                          className="text-xs text-slate-500 hover:text-slate-700 transition-colors text-left"
                        >
                          {expandedInquiry === q.id ? (
                            <span className="text-brand-500">▲ Hide message</span>
                          ) : (
                            <span className="truncate block max-w-xl">▼ {q.message.substring(0, 100)}{q.message.length > 100 ? '…' : ''}</span>
                          )}
                        </button>
                        {expandedInquiry === q.id && (
                          <p className="mt-2 text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                            {q.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
