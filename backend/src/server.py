from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from models.aiModel_1 import agent
from langchain_core.messages import HumanMessage
import json
import uvicorn
import os

app = FastAPI()
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyse")
async def meal_suggestions(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    filepath = os.path.join("uploads", file.filename)

    with open(filepath, "wb+") as f:
        f.write(await file.read())

    result = await agent.ainvoke(
        {"messages": [HumanMessage(content=f"suggest meals from {filepath}")]}
    )

    output = result["messages"][-1].content.replace("'",'"')

    update_output = json.loads(output)

    for idx, o in enumerate(update_output):
        o["id"] = idx + 1

    print(update_output)
    return update_output


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
