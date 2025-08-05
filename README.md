
# 🎬 Movie Recommendation System (Part 2)

A full-stack **Movie Recommendation System** built using **Python (ML model)**, **Node.js (backend)**, and **Next.js + ShadCN UI (frontend)**.

## 📦 Features

- 🔍 User inputs a movie name
- 📡 Node.js server calls a Python script with pre-trained model
- 🧠 Python uses cosine similarity to find top 5 similar movies
- 🌐 Frontend built with Next.js App Router & ShadCN components

---

## 🧠 Tech Stack

- Python (Pandas, Pickle, Cosine Similarity)
- Node.js (`child_process` for Python integration)
- Next.js (App Router)
- ShadCN UI + TailwindCSS

---

## 📁 Folder Structure

movie-recommender/
├── backend/ # Node.js server
│ └── server.js
│ |__ predict.py # Python script
├── frontend/ # Next.js + ShadCN UI
│ └── app/
│ └── page.tsx
├── predict.py # Python script
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Omkar2240/movie-recommender.git
cd movie-recommender

2. Install & Run Backend
bash
Copy
Edit
cd backend
npm install
node server.js

3. Install & Run Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm run dev

4. Test the App
Go to http://localhost:3000

Type any movie name (e.g., Avatar)

Get the top 5 similar movies recommended from your ML model

🧠 ML Model Details
Movie titles vectorized using TF-IDF

Similarity computed using cosine similarity

Data stored in .pkl files and reused efficiently

Script: predict.py takes movie name and returns similar movies in JSON



