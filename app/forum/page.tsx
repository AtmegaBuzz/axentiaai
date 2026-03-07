'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { MessageSquare, Users, Cpu, Database, BarChart3, Plus, ThumbsUp, MessageCircle, Eye } from 'lucide-react';

const categories = [
    { icon: <Cpu className="w-5 h-5" />, name: 'AI & Machine Learning', threads: 24, color: 'text-brand-500 bg-brand-50' },
    { icon: <Database className="w-5 h-5" />, name: 'SAP & ERP', threads: 38, color: 'text-accent-600 bg-accent-50' },
    { icon: <BarChart3 className="w-5 h-5" />, name: 'Data Analytics', threads: 15, color: 'text-emerald-600 bg-emerald-50' },
];

const threads = [
    { title: 'Best practices for SAP S/4HANA migration?', author: 'Rahul M.', category: 'SAP & ERP', replies: 12, likes: 8, views: 156, time: '2h ago' },
    { title: 'How to prepare for SAP FICO certification?', author: 'Priya S.', category: 'SAP & ERP', replies: 7, likes: 15, views: 234, time: '4h ago' },
    { title: 'AI use cases in enterprise supply chain', author: 'Amit K.', category: 'AI & Machine Learning', replies: 5, likes: 11, views: 89, time: '1d ago' },
    { title: 'Power BI vs SAP Analytics Cloud — comparison', author: 'Neha R.', category: 'Data Analytics', replies: 18, likes: 22, views: 312, time: '2d ago' },
    { title: 'Cross-module integration tips for beginners', author: 'Vikash T.', category: 'SAP & ERP', replies: 9, likes: 6, views: 145, time: '3d ago' },
];

export default function ForumPage() {
    const [tab, setTab] = useState<'threads' | 'login' | 'register' | 'post'>('threads');

    return (
        <>
            <Navbar />
            <main className="pt-24">
                <section className="py-16 bg-gradient-to-br from-slate-900 to-brand-950">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white tracking-tight mb-4">Community Forum</motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-300">Connect, learn, and share with fellow consultants.</motion.p>
                    </div>
                </section>

                <section className="py-12 bg-slate-50 min-h-[60vh]">
                    <div className="container mx-auto px-4 md:px-6">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {(['threads', 'post', 'login', 'register'] as const).map((t) => (
                                <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-brand-50'}`}>
                                    {t === 'threads' ? 'Discussions' : t === 'post' ? 'New Post' : t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>

                        {tab === 'threads' && (
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {/* Categories sidebar */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
                                    {categories.map((c) => (
                                        <div key={c.name} className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3 hover:border-brand-300 transition-colors cursor-pointer">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.color}`}>{c.icon}</div>
                                            <div>
                                                <p className="font-medium text-slate-900 text-sm">{c.name}</p>
                                                <p className="text-xs text-slate-500">{c.threads} threads</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Thread list */}
                                <div className="lg:col-span-3 space-y-4">
                                    {threads.map((t) => (
                                        <div key={t.title} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-brand-200 hover:shadow-sm transition-all cursor-pointer">
                                            <h3 className="font-bold text-slate-900 mb-2">{t.title}</h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                                <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded text-xs font-medium">{t.category}</span>
                                                <span>by {t.author}</span>
                                                <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{t.replies}</span>
                                                <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{t.likes}</span>
                                                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{t.views}</span>
                                                <span>{t.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'post' && (
                            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Post</h2>
                                <div className="space-y-4">
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Title</label><input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Post title" /></div>
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                        <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500">
                                            <option>AI & Machine Learning</option><option>SAP & ERP</option><option>Data Analytics</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Content</label><textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 h-40" placeholder="Write your post..." /></div>
                                    <Button variant="primary" className="w-full">Publish Post</Button>
                                </div>
                            </div>
                        )}

                        {(tab === 'login' || tab === 'register') && (
                            <div className="max-w-md mx-auto bg-white rounded-2xl p-8 border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">{tab === 'login' ? 'Login' : 'Create Account'}</h2>
                                <div className="space-y-4">
                                    {tab === 'register' && <div><label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label><input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your name" /></div>}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Email</label><input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="you@email.com" /></div>
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Password</label><input type="password" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="••••••••" /></div>
                                    <Button variant="primary" className="w-full">{tab === 'login' ? 'Sign In' : 'Create Account'}</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
