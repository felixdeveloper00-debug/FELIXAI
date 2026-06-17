from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import requests

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

OLLAMA_URL = "http://localhost:11434/api/generate"

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )

@app.post("/chat")
async def chat(request: Request):

    data = await request.json()

    prompt = data.get("message", "")

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "stream": False
        }
    )

    answer = response.json()["response"]

    return JSONResponse({
        "response": answer
    })
