import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userApi } from '../services/api';

const Profile = () => {
  const { user, login } = useContext(AuthContext); // We can use login to update the user context
  
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isDark, setIsDark] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userApi.updateProfile(name);
      localStorage.setItem('user', JSON.stringify(data));
      login(data); // update context
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await userApi.updatePassword(password);
      setMessage('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen animate-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Profile Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences.</p>
      </header>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            Appearance
          </h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-700">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme across the application</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isDark ? 'bg-primary-500' : 'bg-gray-300 dark:bg-dark-700'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <form onSubmit={handleUpdateProfile} className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-gray-100 dark:bg-dark-900/50 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <button type="submit" className="mt-4 bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all">
              Save Changes
            </button>
          </div>
        </form>

        {/* Security */}
        <form onSubmit={handleUpdatePassword} className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
            </div>
            <button type="submit" disabled={!password} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
