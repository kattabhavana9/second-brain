# 🧠 Second Brain — AI Powered Knowledge System

Live Demo: https://second-brain-six-dun.vercel.app

## Overview

Second Brain is an AI-powered knowledge management system that helps users capture, organize, and query information using intelligent search and summarization.

Users can store notes, insights, and links with metadata, then query their knowledge base conversationally.

---

## Features

• Knowledge capture with tags and metadata  
• Searchable dashboard  
• AI assistant for querying knowledge  
• Automatic summarization and tagging  
• Architecture documentation  
• Public API endpoint  

---

## Tech Stack

Frontend  
React + Vite + TailwindCSS

Backend  
Node.js + Express API

AI  
OpenAI / LLM-based assistant logic

Database  
In-memory store (ready for PostgreSQL / Supabase)

Deployment  
Vercel

---

## Project Architecture

The application follows a layered architecture:

Presentation Layer  
React components and UI

State Layer  
Custom hooks for knowledge management

AI Layer  
LLM-powered assistant logic

Storage Layer  
Data abstraction ready for PostgreSQL / Supabase

---

## Public API

Endpoint:

GET /api/public/brain/query?q=your-question

Example response:

{
  "query": "ai",
  "answer": "Example response from your Second Brain",
  "sources": ["Artificial Intelligence note"]
}

---

## Setup Instructions

Clone the repository

git clone https://github.com/kattabhavana9/second-brain

Install dependencies

npm install

Start frontend

npm run dev

Start API

node server.js

---

## Environment Variables

Create `.env` file if using external APIs

OPENAI_API_KEY=your_key_here

---

## Documentation

Architecture documentation available at:

/docs

Includes:

• Portable architecture  
• UX design principles  
• Agent-based system thinking  
• Infrastructure mindset  

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://github.com/kattabhavana9/second-brain/blob/main/screenshots/Screenshot%202026-03-16%20125310.png?raw=true)

### Knowledge Dashboard
![Dashboard](https://github.com/kattabhavana9/second-brain/blob/main/screenshots/Screenshot%202026-03-16%20125902.png?raw=true)

### AI Assistant Query
![AI Assistant](https://github.com/kattabhavana9/second-brain/blob/main/screenshots/Screenshot%202026-03-16%20125927.png?raw=true)

### Architecture Documentation
![Architecture](https://github.com/kattabhavana9/second-brain/blob/main/screenshots/Screenshot%202026-03-16%20125939.png?raw=true)

## 🎥 Hedamo Product Analysis (Video)

6 minute video explaining my understanding of Hedamo, areas of confusion, improvement ideas, and my 3-month priorities.

Video Link:
https://drive.google.com/file/d/1jIIupIfNQLWWSo5pT16VXi6OjSKEkf8I/view?usp=sharing


 

---

## Author

Katta Bhavana
22211a6757@bvrit.ac.in
