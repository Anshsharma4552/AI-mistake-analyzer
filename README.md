# AI Mistake Analyzer

A futuristic, full-stack web application designed to analyze user thinking patterns rather than just solving problems. It acts as an intelligent mentor, scanning code, written answers, or MCQ reasoning to identify conceptual gaps and thinking errors.

## 🚀 Tech Stack

- **Frontend**: Next.js (TypeScript), Tailwind CSS, Framer Motion, Monaco Editor, Recharts.
- **Backend**: FastAPI (Python), OpenAI API, Motor (Async MongoDB).
- **Database**: MongoDB.
- **Animations**: Framer Motion, CSS Keyframes.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- MongoDB (Running locally or via Atlas)
- OpenAI API Key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Update `.env` with your OpenAI API Key and MongoDB URI.
5. Start the FastAPI server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 UI/UX Theme

- **Colors**: Black (#0a0a0a), Purple (#8b5cf6), Neon Blue (#0ea5e9).
- **Aesthetics**: Dark futuristic, Glassmorphism, Neon glows, Smooth micro-interactions.

## 🧠 AI Behavior

The system uses a structured prompt to enforce "Mentor Mode":
- Focuses on reasoning, not just answers.
- Detects patterns (rushing, guessing, misunderstanding).
- Returns structured JSON for consistent UI rendering.

---


