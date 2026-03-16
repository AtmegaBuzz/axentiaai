'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle2, XCircle, Users, Clock, LogOut, RefreshCw, Mail, Download } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'forum' | 'subscribers'>('forum');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [subscribersError, setSubscribersError] = useState('');

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
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUsers([]);
    setSubscribers([]);
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
    <main className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/axentia-logo.png"
              alt="AxentiaAI"
              width={140}
              height={40}
              className="h-6 w-auto"
              priority
            />
            <span className="text-slate-300">|</span>
            <span className="text-sm font-semibold text-slate-500">Admin Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchUsers(); fetchSubscribers(); }}
              disabled={loadingUsers || loadingSubscribers}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${(loadingUsers || loadingSubscribers) ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{approvedCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending</span>
            </div>
            <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <Mail className="w-4 h-4 text-violet-500" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subscribers</span>
            </div>
            <p className="text-3xl font-bold text-violet-600">{subscribers.length}</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
          <button
            onClick={() => setActiveTab('forum')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'forum'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Users className="w-4 h-4" />
            Forum Members
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'subscribers'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Mail className="w-4 h-4" />
            Newsletter Subscribers
            {subscribers.length > 0 && (
              <span className="ml-1 bg-violet-100 text-violet-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {subscribers.length}
              </span>
            )}
          </button>
        </div>

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
      </div>
    </main>
  );
}
