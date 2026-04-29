import os
import json
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Mistake Analyzer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI Client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# MongoDB Connection
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
db_client = AsyncIOMotorClient(MONGO_URI)
db = db_client.aimistake

# Pydantic Models
class AnalysisRequest(BaseModel):
    type: str  # code, text, mcq
    content: str

class AnalysisResponse(BaseModel):
    mistake_type: str
    concept_gap: str
    thinking_error: str
    detailed_analysis: str
    improvement_plan: List[str]
    difficulty_level: str
    confidence_score: str

# System Prompt Template
SYSTEM_PROMPT = """
You are an "Intelligent Mentor" specializing in cognitive behavioral analysis of learning. 
Your goal is NOT just to solve the problem, but to analyze the USER'S THINKING PROCESS based on their input.

When given an input (code, written answer, or MCQ reasoning), you must:
1. Identify the specific type of mistake made.
2. Determine the underlying conceptual gap (what they don't understand).
3. Identify the thinking error (e.g., rushing, guessing, logical fallacy, over-complication).
4. Provide a detailed analysis of WHY they made that specific error.
5. Suggest a personalized 3-step improvement plan.

CRITICAL: You must return the analysis ONLY in the following structured JSON format:
{
  "mistake_type": "string",
  "concept_gap": "string",
  "thinking_error": "string",
  "detailed_analysis": "string",
  "improvement_plan": ["string", "string", "string"],
  "difficulty_level": "Beginner/Intermediate/Advanced",
  "confidence_score": "0.00-1.00"
}
"""

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_input(request: AnalysisRequest):
    try:
        # Prepare the user prompt based on input type
        user_content = f"Input Type: {request.type}\nUser Content: {request.content}"
        
        # Call OpenAI
        response = client.chat.completions.create(
            model="gpt-4o", # Using GPT-4o for better reasoning
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content}
            ],
            response_format={"type": "json_object"}
        )
        
        # Parse result
        analysis_json = json.loads(response.choices[0].message.content)
        
        # Validate with Pydantic
        analysis_data = AnalysisResponse(**analysis_json)
        
        # Store in MongoDB
        await db.analyses.insert_one({
            "type": request.type,
            "content": request.content,
            "analysis": analysis_json,
            "timestamp": os.getenv("TIMESTAMP", "2024-01-01") # Placeholder for real timestamp
        })
        
        return analysis_data
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_history(limit: int = 10):
    cursor = db.analyses.find().sort("timestamp", -1).limit(limit)
    history = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        history.append(document)
    return history

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
