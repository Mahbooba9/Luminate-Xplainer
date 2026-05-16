const { GoogleGenAI } = require('@google/genai');
const History = require('../models/History');
// Initialize Gemini
// Note: We use the new SDK as requested
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Generate topic explanation
// @route   POST /api/topics/generate
// @access  Private
const generateTopic = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const prompt = `
      You are an expert tutor and instructional designer. I need you to explain the topic: "${topic}".
      Please respond ONLY with a valid JSON object matching exactly this structure. Do not wrap it in markdown block quotes like \`\`\`json.
      {
        "topic": "${topic}",
        "overview": "A clear, engaging, and beginner-friendly explanation of the topic (2-3 paragraphs).",
        "diagram": "A valid Mermaid.js flowchart (using graph TD) that visualizes the core concepts. Provide ONLY the raw mermaid syntax string. CRITICAL: Do NOT use parentheses () or brackets [] inside node names or it will crash. Keep node text simple.",
        "concepts": [
          {
            "title": "Concept Name",
            "description": "Detailed explanation of this sub-topic."
          }
        ],
        "importantPoints": ["Key point 1", "Key point 2"],
        "examples": [
          {
            "scenario": "Real world scenario",
            "explanation": "How the topic applies here"
          }
        ],
        "memoryTricks": ["Mnemonic, analogy, or trick to remember"],
        "interviewQuestions": [
          {
            "question": "Common interview or exam question",
            "answer": "Detailed answer"
          }
        ],
        "quiz": [
          {
            "question": "Challenging multiple-choice question?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option A",
            "explanation": "Why Option A is correct and why others are wrong."
          }
        ],
        "summary": "A short, motivating summary section."
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
            responseMimeType: "application/json"
        }
    });

    let explanationData;
    try {
      const responseText = response.text;
      explanationData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", response.text);
      return res.status(500).json({ message: 'Failed to generate a structured response from AI.' });
    }

    // Save to history
    const historyRecord = await History.create({
      user: req.user._id,
      topic: explanationData.topic || topic,
      explanation: explanationData
    });

    res.status(200).json(historyRecord);

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ message: error.message || 'Server Error generating topic' });
  }
};

// @desc    Get user history
// @route   GET /api/topics/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a specific history item
// @route   GET /api/topics/history/:id
// @access  Private
const getHistoryItem = async (req, res) => {
  try {
    const item = await History.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'History item not found' });
    }
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle bookmark status
// @route   PUT /api/topics/history/:id/bookmark
// @access  Private
const toggleBookmark = async (req, res) => {
    try {
      const item = await History.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'History item not found' });
      }
      if (item.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      
      item.isBookmarked = !item.isBookmarked;
      await item.save();
      
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { generateTopic, getHistory, getHistoryItem, toggleBookmark };
