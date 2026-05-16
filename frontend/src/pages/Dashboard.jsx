import React, { useState } from 'react';
import { topicsApi } from '../services/api';
import MermaidDiagram from '../components/MermaidDiagram';
import ReactMarkdown from 'react-markdown';

const Dashboard = () => {
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    setIsGenerating(true);
    try {
      const response = await topicsApi.generate(topicInput);
      setGeneratedContent(response.data.explanation);
    } catch (error) {
      console.error('Error generating topic:', error);
      alert('Failed to generate topic.');
    } finally {
      setIsGenerating(false);
    }
  };

  // PDF functions removed

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400">What would you like to learn today?</p>
      </header>

      {/* Removed Tabs */}

      <div className="space-y-8 animate-fade-in">
          <form onSubmit={handleGenerate} className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700">
            <div className="flex gap-4">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Enter any topic (e.g., Quantum Computing, Photosynthesis, React Hooks)"
                className="flex-1 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isGenerating || !topicInput.trim()}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:shadow-primary-500/20"
              >
                {isGenerating ? 'Generating...' : 'Generate Magic'}
              </button>
            </div>
          </form>

          {generatedContent && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{generatedContent.topic}</h2>
                <div className="prose dark:prose-invert prose-lg max-w-none mb-8 relative z-10">
                  <ReactMarkdown>{generatedContent.overview}</ReactMarkdown>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Core Concepts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedContent.concepts?.map((c, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-dark-900 p-5 rounded-2xl border border-gray-100 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                      <h4 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">{c.title}</h4>
                      <div className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-400">
                        <ReactMarkdown>{c.description}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>

                {generatedContent.diagram && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Visual Flowchart</h3>
                    <MermaidDiagram chart={generatedContent.diagram} />
                  </>
                )}

                {generatedContent.examples && generatedContent.examples.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Real-World Examples</h3>
                    <div className="space-y-4">
                      {generatedContent.examples.map((ex, i) => (
                        <div key={i} className="bg-secondary-50/50 dark:bg-secondary-900/10 p-5 rounded-2xl border border-secondary-100 dark:border-secondary-800">
                          <h4 className="font-semibold text-secondary-700 dark:text-secondary-400 mb-1">{ex.scenario}</h4>
                          <div className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-400">
                            <ReactMarkdown>{ex.explanation}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {generatedContent.memoryTricks && generatedContent.memoryTricks.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Memory Tricks</h3>
                    <div className="bg-secondary-50/50 dark:bg-secondary-900/10 border border-secondary-100 dark:border-secondary-800 p-5 rounded-2xl">
                      <ul className="list-disc pl-5 space-y-2 text-secondary-800 dark:text-secondary-200">
                        {generatedContent.memoryTricks.map((trick, i) => (
                          <li key={i}>
                            <ReactMarkdown components={{ p: 'span' }}>{trick}</ReactMarkdown>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {generatedContent.interviewQuestions && generatedContent.interviewQuestions.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Interview & Exam Prep</h3>
                    <div className="space-y-4">
                      {generatedContent.interviewQuestions.map((q, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-dark-900 p-5 rounded-2xl border border-gray-100 dark:border-dark-700">
                          <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: {q.question}</p>
                          <div className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-400">
                            <strong>A: </strong> <ReactMarkdown components={{ p: 'span' }}>{q.answer}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {generatedContent.quiz && generatedContent.quiz.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Quick Quiz</h3>
                    <div className="space-y-4">
                      {generatedContent.quiz.map((q, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-dark-900 p-5 rounded-2xl border border-gray-100 dark:border-dark-700">
                          <p className="font-medium text-gray-900 dark:text-white mb-3">{q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, j) => (
                              <div key={j} className="px-4 py-2 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 text-sm text-gray-700 dark:text-gray-300">
                                {opt}
                              </div>
                            ))}
                          </div>
                          <p className="mt-3 text-sm text-green-600 dark:text-green-400 font-medium pt-3 border-t border-gray-200 dark:border-dark-700">Answer: {q.correctAnswer}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
