'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  MessageSquare,
  Plus,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  ArrowLeft,
  ArrowRight,
  X,
  Search,
  Pin,
  Lock,
  CheckCircle2,
  Clock,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Profile, Category, Thread, Post } from '@/lib/supabase/types';
import type { User as SupabaseUser } from '@supabase/supabase-js';

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  brand: { bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
};

function getCatColor(color: string | null) {
  return categoryColors[color || 'brand'] || categoryColors.brand;
}

/* ═══════════════════════════════════════════════════════════════
   AUTH MODAL
   ═══════════════════════════════════════════════════════════════ */

function AuthModal({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean; onClose: () => void; initialMode?: 'login' | 'register' }) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setError('');
    setSuccess('');
  }, [initialMode, isOpen]);

  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/forum`,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/forum`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Check your email for a confirmation link!');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        onClose();
        window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {mode === 'login' ? 'Welcome back' : 'Create an account'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {mode === 'login' ? 'Sign in to join the discussion' : 'Join the Axentia.AI community'}
                  </p>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-8 pb-8">
                {/* Google button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all mb-6 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 uppercase font-medium">or</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Email form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                      placeholder="Min. 6 characters"
                      minLength={6}
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>}
                  {success && <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2">{success}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 shadow-lg shadow-brand-600/25"
                  >
                    {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                {/* Toggle mode */}
                <p className="text-sm text-slate-500 text-center mt-6">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button
                    onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }}
                    className="text-brand-600 font-semibold hover:underline"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   USER MENU (avatar dropdown)
   ═══════════════════════════════════════════════════════════════ */

function UserMenu({ user, profile }: { user: SupabaseUser; profile: Profile | null }) {
  const [open, setOpen] = useState(false);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleToggle = () => {
    if (!open && btnRef.current) {
      setBtnRect(btnRef.current.getBoundingClientRect());
    }
    setOpen(!open);
  };

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-1 pr-3 py-1 hover:border-brand-300 transition-colors"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">
            {getInitials(displayName)}
          </div>
        )}
        <span className="text-sm font-medium text-slate-700 hidden sm:inline">{displayName}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {open && btnRect && (
          <>
            <div className="fixed inset-0 z-[199]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                position: 'fixed',
                top: btnRect.bottom + 8,
                right: window.innerWidth - btnRect.right,
              }}
              className="bg-white border border-slate-200 rounded-xl shadow-xl z-[200] w-56 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">{displayName}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CREATE THREAD MODAL
   ═══════════════════════════════════════════════════════════════ */

function CreateThreadModal({
  isOpen,
  onClose,
  categories,
  userId,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  userId: string;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [isOpen, categories, categoryId]);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    setError('');

    // Create thread
    const { data: thread, error: threadErr } = await supabase
      .from('threads')
      .insert({
        title: title.trim(),
        slug: slugify(title) + '-' + Date.now().toString(36),
        category_id: categoryId,
        author_id: userId,
      })
      .select()
      .single();

    if (threadErr) {
      setError(threadErr.message);
      setLoading(false);
      return;
    }

    // Create first post (thread body)
    const { error: postErr } = await supabase
      .from('posts')
      .insert({
        thread_id: thread.id,
        author_id: userId,
        content: content.trim(),
      });

    if (postErr) {
      setError(postErr.message);
      setLoading(false);
      return;
    }

    setTitle('');
    setContent('');
    setLoading(false);
    onCreated();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200">
              <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Start a Discussion</h2>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm h-40 resize-none"
                    placeholder="Share your thoughts, questions, or insights..."
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>}
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !title.trim() || !content.trim()}
                    className="px-6 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 shadow-lg shadow-brand-600/25"
                  >
                    {loading ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THREAD DETAIL VIEW
   ═══════════════════════════════════════════════════════════════ */

function ThreadView({
  thread,
  onBack,
  user,
  isApproved,
  onAuthRequired,
}: {
  thread: Thread;
  onBack: () => void;
  user: SupabaseUser | null;
  isApproved: boolean;
  onAuthRequired: () => void;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*, author:profiles(*)')
      .eq('thread_id', thread.id)
      .order('created_at', { ascending: true });

    if (data) {
      // Fetch reactions for each post
      const postIds = data.map((p: Post) => p.id);
      const { data: reactions } = await supabase
        .from('reactions')
        .select('*')
        .in('post_id', postIds);

      const enriched = data.map((post: Post) => {
        const postReactions = reactions?.filter((r) => r.post_id === post.id) || [];
        return {
          ...post,
          upvotes: postReactions.filter((r) => r.type === 'upvote').length,
          downvotes: postReactions.filter((r) => r.type === 'downvote').length,
          user_reaction: user ? postReactions.find((r) => r.user_id === user.id)?.type || null : null,
        };
      });
      setPosts(enriched);
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread.id, user?.id]);

  useEffect(() => {
    fetchPosts();
    // Increment view count
    supabase.from('threads').update({ view_count: (thread.view_count || 0) + 1 }).eq('id', thread.id).then();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPosts]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { onAuthRequired(); return; }
    if (!isApproved) return;
    if (!replyContent.trim()) return;
    setSubmitting(true);

    await supabase.from('posts').insert({
      thread_id: thread.id,
      author_id: user.id,
      content: replyContent.trim(),
    });

    setReplyContent('');
    setSubmitting(false);
    fetchPosts();
  };

  const handleReaction = async (postId: string, type: 'upvote' | 'downvote') => {
    if (!user) { onAuthRequired(); return; }

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.user_reaction === type) {
      // Remove existing reaction
      await supabase.from('reactions').delete().eq('post_id', postId).eq('user_id', user.id);
    } else {
      // Upsert reaction
      await supabase.from('reactions').delete().eq('post_id', postId).eq('user_id', user.id);
      await supabase.from('reactions').insert({ post_id: postId, user_id: user.id, type });
    }
    fetchPosts();
  };

  const catColor = getCatColor(thread.category?.color || null);

  return (
    <div>
      {/* Back button + thread header */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to discussions
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
        <div className="px-6 md:px-8 py-6 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {thread.category && (
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${catColor.bg} ${catColor.text}`}>
                {thread.category.icon} {thread.category.name}
              </span>
            )}
            {thread.is_pinned && <span className="flex items-center gap-1 text-xs text-amber-600"><Pin className="w-3 h-3" /> Pinned</span>}
            {thread.is_locked && <span className="flex items-center gap-1 text-xs text-slate-400"><Lock className="w-3 h-3" /> Locked</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{thread.title}</h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            {thread.author && (
              <div className="flex items-center gap-2">
                {thread.author.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thread.author.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-[10px] font-bold">
                    {getInitials(thread.author.full_name)}
                  </div>
                )}
                <span className="font-medium text-slate-700">{thread.author.full_name}</span>
              </div>
            )}
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {timeAgo(thread.created_at)}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {thread.view_count} views</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {posts.length} replies</span>
          </div>
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
              <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200" />
                <div className="space-y-2 flex-1">
                  <div className="w-32 h-4 bg-slate-200 rounded" />
                  <div className="w-20 h-3 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-slate-100 rounded" />
                <div className="w-3/4 h-4 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`bg-white rounded-2xl border ${idx === 0 ? 'border-brand-200 ring-1 ring-brand-100' : 'border-slate-200'} overflow-hidden`}
            >
              <div className="px-6 py-5">
                <div className="flex items-start gap-3 mb-4">
                  {post.author?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.author.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm font-bold shrink-0">
                      {getInitials(post.author?.full_name || null)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm">{post.author?.full_name || 'Anonymous'}</span>
                      {idx === 0 && <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">OP</span>}
                      {post.is_solution && <span className="flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"><CheckCircle2 className="w-3 h-3" /> Solution</span>}
                    </div>
                    <p className="text-xs text-slate-400">{timeAgo(post.created_at)}</p>
                  </div>
                </div>

                {/* Post content */}
                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap mb-4 pl-[52px]">
                  {post.content}
                </div>

                {/* Reactions */}
                <div className="flex items-center gap-3 pl-[52px]">
                  <button
                    onClick={() => handleReaction(post.id, 'upvote')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      post.user_reaction === 'upvote'
                        ? 'bg-brand-100 text-brand-700 border border-brand-200'
                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-brand-50 hover:text-brand-600'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {post.upvotes || 0}
                  </button>
                  <button
                    onClick={() => handleReaction(post.id, 'downvote')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      post.user_reaction === 'downvote'
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> {post.downvotes || 0}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply form */}
      {!thread.is_locked && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {!user ? (
            <div className="p-6 text-center">
              <p className="text-sm text-slate-500 mb-3">Sign in to join the discussion</p>
              <button onClick={onAuthRequired} className="px-5 py-2 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors">
                Sign In
              </button>
            </div>
          ) : !isApproved ? (
            <div className="p-6 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Approval required to post</p>
                <p className="text-xs text-slate-500 mt-0.5">Your account is pending admin approval. You can still like posts while you wait.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReply} className="p-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">Reply to this thread</label>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm h-28 resize-none mb-4"
                placeholder="Share your thoughts..."
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !replyContent.trim()}
                  className="px-6 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 shadow-lg shadow-brand-600/25"
                >
                  {submitting ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN FORUM PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ForumPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showCreateThread, setShowCreateThread] = useState(false);

  const supabase = createClient();

  // Fetch auth state
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*').order('sort_order');
      if (data) setCategories(data);
    };
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch threads
  const fetchThreads = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('threads')
      .select('*, author:profiles(*), category:categories(*)')
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    const { data } = await query;

    if (data) {
      // Get post counts and reaction counts
      const threadIds = data.map((t: Thread) => t.id);
      const { data: postCounts } = await supabase
        .from('posts')
        .select('thread_id')
        .in('thread_id', threadIds);

      const enriched = data.map((thread: Thread) => ({
        ...thread,
        post_count: postCounts?.filter((p) => p.thread_id === thread.id).length || 0,
      }));

      setThreads(enriched);
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const isApproved = profile?.forum_approved ?? false;

  const handleNewThread = () => {
    if (!user) { openAuth('login'); return; }
    if (!isApproved) return;
    setShowCreateThread(true);
  };

  const filteredThreads = threads.filter((t) =>
    searchQuery ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  // Count threads per category
  const categoryCounts = categories.map((cat) => ({
    ...cat,
    threadCount: threads.filter((t) => t.category_id === cat.id).length,
  }));

  return (
    <>
      <main className="pt-0">
        {/* Hero */}
        <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #58179B 0%, #8929AC 40%, #C010DA 100%)' }} />
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-400/15 rounded-full blur-[100px]" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 xl:px-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
              <div>
                <p className="text-brand-300 font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4">Community</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 sm:mb-3">
                  Discussion{' '}
                  <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">Forum</span>
                </h1>
                <p className="text-base sm:text-lg text-indigo-200/80 max-w-lg">
                  Connect with fellow consultants, share knowledge, and grow together.
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {user ? (
                  <>
                    {isApproved && (
                      <button
                        onClick={handleNewThread}
                        className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:shadow-lg transition-all text-sm"
                      >
                        <Plus className="w-4 h-4" /> New Discussion
                      </button>
                    )}
                    <UserMenu user={user} profile={profile} />
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => openAuth('login')}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-white/80 hover:text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuth('register')}
                      className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:shadow-lg transition-all text-sm"
                    >
                      Join Community
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Forum body */}
        <section className="py-8 md:py-12 bg-slate-50 min-h-[60vh]">
          <div className="container mx-auto px-6 md:px-12 xl:px-20">
            {selectedThread ? (
              <ThreadView
                thread={selectedThread}
                onBack={() => setSelectedThread(null)}
                user={user}
                isApproved={isApproved}
                onAuthRequired={() => openAuth('login')}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                      placeholder="Search discussions..."
                    />
                  </div>

                  {/* Categories */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Categories</h3>
                    </div>
                    <div className="p-2">
                      {/* All */}
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                          !selectedCategory ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${!selectedCategory ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">All Discussions</p>
                          <p className="text-xs text-slate-400">{threads.length} threads</p>
                        </div>
                      </button>

                      {categoryCounts.map((cat) => {
                        const color = getCatColor(cat.color);
                        const isActive = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                              isActive ? `${color.bg} ${color.text}` : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isActive ? color.bg : 'bg-slate-100'}`}>
                              {cat.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{cat.name}</p>
                              <p className="text-xs text-slate-400">{cat.threadCount} threads</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Community Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Total Threads</span>
                        <span className="font-semibold text-slate-900">{threads.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Categories</span>
                        <span className="font-semibold text-slate-900">{categories.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thread list */}
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedCategory
                        ? categories.find((c) => c.id === selectedCategory)?.name || 'Discussions'
                        : 'All Discussions'}
                    </h2>
                    {user && isApproved && (
                      <button
                        onClick={handleNewThread}
                        className="flex items-center gap-2 bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors text-sm shadow-lg shadow-brand-600/25"
                      >
                        <Plus className="w-4 h-4" /> New Thread
                      </button>
                    )}
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                          <div className="w-3/4 h-5 bg-slate-200 rounded mb-3" />
                          <div className="flex gap-3">
                            <div className="w-16 h-3 bg-slate-100 rounded" />
                            <div className="w-20 h-3 bg-slate-100 rounded" />
                            <div className="w-12 h-3 bg-slate-100 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredThreads.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                      <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900 mb-2">No discussions yet</h3>
                      <p className="text-sm text-slate-500 mb-6">
                        {searchQuery ? 'No threads match your search.' : 'Be the first to start a conversation!'}
                      </p>
                      {user && isApproved && !searchQuery && (
                        <button
                          onClick={handleNewThread}
                          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" /> Start a Discussion
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredThreads.map((thread, idx) => {
                        const catColor = getCatColor(thread.category?.color || null);
                        return (
                          <motion.div
                            key={thread.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                          >
                            <button
                              onClick={() => setSelectedThread(thread)}
                              className="w-full text-left bg-white rounded-2xl border border-slate-200 p-5 md:p-6 hover:border-brand-200 hover:shadow-sm transition-all group"
                            >
                              <div className="flex items-start gap-4">
                                {/* Author avatar */}
                                {thread.author?.avatar_url ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={thread.author.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 hidden sm:block" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm font-bold shrink-0 hidden sm:block">
                                    {getInitials(thread.author?.full_name || null)}
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    {thread.is_pinned && <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                                    <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                                      {thread.title}
                                    </h3>
                                    {thread.is_locked && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                                  </div>

                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                                    {thread.category && (
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${catColor.bg} ${catColor.text}`}>
                                        {thread.category.icon} {thread.category.name}
                                      </span>
                                    )}
                                    <span>by <span className="font-medium text-slate-600">{thread.author?.full_name || 'Anonymous'}</span></span>
                                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {(thread.post_count || 1) - 1} replies</span>
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {thread.view_count}</span>
                                    <span>{timeAgo(thread.updated_at)}</span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
      {user && (
        <CreateThreadModal
          isOpen={showCreateThread}
          onClose={() => setShowCreateThread(false)}
          categories={categories}
          userId={user.id}
          onCreated={fetchThreads}
        />
      )}
    </>
  );
}
