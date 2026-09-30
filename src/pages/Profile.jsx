import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  LogOut,
  Save,
  CheckCircle2,
  Trash2,
  Bookmark,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../features/auth/authSlice';
import { removeResume } from '../features/resume/resumeSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const { uploadedFile } = useSelector((state) => state.resume);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || 'Full Stack Engineer',
    location: user?.location || 'San Francisco, CA',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully.');
    navigate('/');
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name || 'Profile'}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md shrink-0"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                  {user?.name || 'Candidate Name'}
                </h1>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {user?.title || 'Full Stack Engineer'}
                </p>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-start">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  leftIcon={LogOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {user?.location || 'Remote'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Joined {user?.joinedDate || 'September 2026'}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Edit Account Information
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  id="profile-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Professional Headline"
                  id="profile-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Location"
                    id="profile-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={Save}>
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Active Resume Management */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Active Resume in Session
            </h3>
            {uploadedFile && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                Available for ATS Matching
              </span>
            )}
          </div>

          {uploadedFile ? (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  PDF
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {uploadedFile.fileName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Uploaded on {new Date(uploadedFile.uploadedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/ats-results')}
                >
                  View ATS Score
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(removeResume());
                    toast.success('Resume cleared');
                  }}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No resume is currently active in this session.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-3"
                onClick={() => navigate('/ats-checker')}
              >
                Upload Resume Now
              </Button>
            </div>
          )}
        </div>

        {/* Security & Access Info */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Data Privacy & Access Credentials
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Your resume files are securely stored locally during your active browser session. Resumes are parsed strictly for ATS keyword benchmarks and job-matching algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
