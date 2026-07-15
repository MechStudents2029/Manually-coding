Adaptive Agent

An AI agent that gets smarter the more you talk to it. Instead of starting fresh every session, it builds on past conversations — and it can shift into different modes depending on what you need:

Study Mode — breaks down concepts, quizzes you, adapts to where you're stuck
Code Mode — acts as a focused pair programmer for your stack and your bugs
Late Night Talk Mode — casual, reflective, less "assistant" and more a sounding board

Built with a React frontend and FastAPI backend, powered by Claude.

Prerequisites

- Python 3.10+
- Node.js 18+
- An Anthropic API key

Setup

1. Backend

```bash
cd backend
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

macOS / Linux:

```bash
source venv/bin/activate
```

```bash
pip install -r requirements.txt
```

Set your Anthropic API key.

Windows (PowerShell):

```powershell
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

macOS / Linux:

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

Start the backend server:

```bash
python -m uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000.

2. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at http://localhost:5173.

API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/submissions | Returns all saved submissions/history |
| POST | /api/submit | Saves text, calls the agent, returns entry |
| GET | /api/health | Health check |

POST /api/submit body

```json
{ "text": "your input here" }
```

Response / stored schema

```json
{
  "id": "uuid",
  "text": "user input",
  "agent_response": "Claude's response",
  "timestamp": "2026-07-06T22:00:00.000000"
}
```

Submissions are persisted in backend/data.json (created automatically on first submit).

Project Structure

```
├── backend/
│   ├── main.py
│   ├── agent.py
│   ├── requirements.txt
│   └── data.json
├── frontend/
│   └── src/
│       └── App.jsx
└── README.md
```
