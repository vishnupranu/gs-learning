'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/layout/AdminLayout';
import { FileText, Plus, Edit, Trash, Search, Eye, Clock, X, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  author?: { name: string };
  published?: string;
  createdAt: string;
}

export default function AdminCMSPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<any>({ title: '', slug: '', content: '', status: 'DRAFT' });
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/cms');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch { } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editPost.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/cms', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPost),
      });
      if (res.ok) {
        toast.success(editPost.id ? 'Post updated' : 'Post created');
        setShowEditor(false);
        setEditPost({ title: '', slug: '', content: '', status: 'DRAFT' });
        fetchPosts();
      } else {
        toast.error('Failed to save post');
      }
    } catch { toast.error('Network error'); } finally { setSaving(false); }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      const res = await fetch('/api/admin/cms', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
        toast.success('Post deleted');
      }
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = posts.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const draftCount = posts.filter(p => p.status === 'DRAFT').length;
  const publishedCount = posts.filter(p => p.status === 'PUBLISHED').length;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management System</h1>
            <p className="text-gray-500 text-sm">{publishedCount} published · {draftCount} drafts</p>
          </div>
          <Button onClick={() => { setEditPost({ title: '', slug: '', content: '', status: 'DRAFT' }); setShowEditor(true); }} className="gradient-bg text-white">
            <Plus size={16} className="mr-2" /> New Post
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Published', value: publishedCount, color: 'text-green-600 bg-green-100' },
            { label: 'Drafts', value: draftCount, color: 'text-yellow-600 bg-yellow-100' },
            { label: 'Total Posts', value: posts.length, color: 'text-blue-600 bg-blue-100' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
              <div className={`text-3xl font-bold ${stat.color.split(' ')[0]} mb-1`}>{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Posts Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Title', 'Slug', 'Author', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 shimmer rounded" /></td>)}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    {search ? 'No posts match your search.' : 'No posts yet. Create your first blog post!'}
                  </td>
                </tr>
              ) : (
                filtered.map(post => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-900 dark:text-white line-clamp-1">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{post.slug}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{post.author?.name || 'Admin'}</td>
                    <td className="px-6 py-4">
                      <Badge className={post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(post.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditPost({ ...post }); setShowEditor(true); }}
                          className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editPost.id ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button onClick={() => setShowEditor(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                  <Input
                    placeholder="Post title"
                    value={editPost.title}
                    onChange={e => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                      setEditPost({ ...editPost, title, slug });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
                  <Input
                    placeholder="url-friendly-slug"
                    value={editPost.slug}
                    onChange={e => setEditPost({ ...editPost, slug: e.target.value })}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
                  <textarea
                    className="w-full min-h-[200px] bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-y font-mono"
                    placeholder="Write your post content in Markdown..."
                    value={editPost.content}
                    onChange={e => setEditPost({ ...editPost, content: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={editPost.status}
                    onChange={e => setEditPost({ ...editPost, status: e.target.value })}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowEditor(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 gradient-bg text-white" disabled={saving}>
                    <Save size={14} className="mr-2" />
                    {saving ? 'Saving...' : 'Save Post'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
