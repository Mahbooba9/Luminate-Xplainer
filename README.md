# Luminate Xplainer 🚀

![Luminate Xplainer Banner](https://img.shields.io/badge/AI-Powered_Learning-14b8a6?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN_Stack-2563eb?style=for-the-badge)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-amber?style=for-the-badge)

Luminate Xplainer is a premium, AI-powered educational platform designed to break down complex topics into beginner-friendly, structured learning paths. Built on the MERN stack and powered by Google's Gemini 2.5 Flash API, it generates dynamic visual flowcharts, memory tricks, interactive quizzes, and interview prep questions for any topic in seconds.

## ✨ Features

- **🧠 Intelligent Explanations:** Deep, engaging overviews of any topic you provide.
- **📊 Visual Flowcharts:** Automatic rendering of complex structures into intuitive Mermaid.js diagrams.
- **💡 Memory Tricks:** AI-generated mnemonics and analogies to help you retain information.
- **🎯 Interview & Exam Prep:** Targeted Q&A tailored to test your understanding.
- **📝 Quick Quizzes:** Multiple-choice questions to validate your knowledge.
- **🌙 Dark Mode:** Beautiful, full-application dark mode built with Tailwind CSS.
- **🔐 Secure Profiles:** JWT-based user authentication, history tracking, and profile management.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React-Markdown, Mermaid.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **AI Engine:** Google Gemini API (`@google/genai`)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed or a MongoDB Atlas URI ready. You will also need a Google Gemini API Key.

### 1. Clone the repository
```bash
git clone https://github.com/Mahbooba9/Luminate-Xplainer.git
cd Luminate-Xplainer
```

### 2. Setup the Backend
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend server:
```bash
npm start
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

## 🌐 Deployment

This project is fully configured for cloud deployment.
- **Backend:** Deploy the `backend` folder as a Web Service on **Render**. Ensure you add your `.env` variables in the Render dashboard.
- **Frontend:** Deploy the `frontend` folder on **Vercel**. Set the `VITE_API_URL` environment variable to your deployed Render URL.

---
*Built to make learning beautiful and effortless.*
