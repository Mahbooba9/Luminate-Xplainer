import React, { useState, useEffect } from 'react';
import { topicsApi } from '../services/api';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await topicsApi.getHistory();
      setHistoryItems(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBookmark = async (id) => {
    try {
      await topicsApi.toggleBookmark(id);
      // Update local state
      setHistoryItems(items => 
        items.map(item => 
          item._id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
        )
      );
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Learning Journey</h1>
          <p className="text-gray-600 dark:text-gray-400">Review your past topics and bookmarks.</p>
        </div>
      </header>

      {historyItems.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-dark-700 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 dark:bg-dark-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No history yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Head over to the Dashboard and generate your first topic!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {historyItems.map((item) => (
            <div key={item._id} className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900/50 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleToggleBookmark(item._id)}
                  className={`p-2 rounded-full transition-colors ${
                    item.isBookmarked 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500' 
                      : 'bg-gray-50 dark:bg-dark-900 text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill={item.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {item.topic}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                {item.explanation?.overview}
              </p>
              
              <button 
                className="w-full py-2.5 bg-gray-50 dark:bg-dark-900 hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors text-sm"
              >
                Review Topic
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
