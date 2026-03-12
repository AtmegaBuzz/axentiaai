'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle2, XCircle, Users, Clock, LogOut, RefreshCw } from 'lucide-react';

const ADMIN_EMAIL = 'admin@axentiaai.in';

interface ForumUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  forum_approved: boolean;
  created_at: string;
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

  // Check if already logged in as admin
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === ADMIN_EMAIL) {
        setIsLoggedIn(true);
        fetchUsers();
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
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUsers([]);
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image
              src="/brand/axentia-logo-white.png"
              alt="AxentiaAI"
              width={180}
              height={48}
              className="h-8 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
            <p className="text-slate-500 text-sm mt-1">Forum Management</p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-600 transition-colors"
                  placeholder="admin@axentiaai.in"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-600 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/40 border border-red-900/60 rounded-xl px-4 py-3">
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
    <main className="min-h-screen bg-slate-950">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/axentia-logo-white.png"
              alt="AxentiaAI"
              width={140}
              height={40}
              className="h-6 w-auto"
              priority
            />
            <span className="text-slate-700">|</span>
            <span className="text-sm font-semibold text-slate-400">Forum Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchUsers}
              disabled={loadingUsers}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Users</span>
            </div>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </div>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Approved</span>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{approvedCount}</p>
          </div>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</span>
            </div>
            <p className="text-3xl font-bold text-amber-400">{pendingCount}</p>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-base font-bold text-white">Forum Members</h2>
              <p className="text-xs text-slate-500 mt-0.5">Approve or revoke users&apos; ability to post and comment</p>
            </div>
            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1">
              {(['all', 'pending', 'approved'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                    filter === f
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
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
              <p className="text-slate-500 text-sm">Loading users...</p>
            </div>
          ) : fetchError ? (
            <div className="p-10 text-center">
              <p className="text-red-400 text-sm font-semibold mb-1">Failed to load users</p>
              <p className="text-slate-500 text-xs">{fetchError}</p>
              <p className="text-slate-600 text-xs mt-3">Make sure you have run the database migration SQL in Supabase.</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-500 text-sm">{users.length === 0 ? 'No users have signed up yet.' : 'No users match this filter.'}</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <div key={u.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-brand-900 flex items-center justify-center text-brand-400 text-sm font-bold shrink-0 overflow-hidden">
                    {u.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      getInitials(u.full_name)
                    )}
                  </div>

                  {/* Name + date */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {u.full_name || <span className="text-slate-500 italic">Unnamed User</span>}
                    </p>
                    <p className="text-xs text-slate-600">
                      Joined {new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    u.forum_approved
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/60'
                      : 'bg-amber-950/80 text-amber-400 border border-amber-900/60'
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
                      className="shrink-0 px-4 py-1.5 text-xs font-semibold text-red-400 border border-red-900/60 hover:bg-red-950/50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {actionLoading === u.id ? '...' : 'Revoke'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(u.id)}
                      disabled={actionLoading === u.id}
                      className="shrink-0 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-900/60 hover:bg-emerald-950/50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {actionLoading === u.id ? '...' : 'Approve'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
