import os
from langchain_ollama import ChatOllama
from langchain_core.tools import tool
from langchain.agents import create_agent
from pytesseract import pytesseract
from PIL import Image


llm = ChatOllama(
    model="qwen3.5:cloud",
    temperature=0,
    base_url=os.getenv("OLLAMA_HOST", "http://localhost:11434")
)

system_prompt = """
extract the text from the image (menu items), suggest healthy meals.

Return STRICT JSON in this format:
[
    {
        "meal": "meal name",
        "calories": number,
        "protein": number,
        "fat": number,
        "carbs": number
    }
]
"""


@tool
def extract_text(file_path: str):
    """use this to extract text from the menu image"""

    img = Image.open(file_path)

    text = pytesseract.image_to_string(img)
    return text


agent = create_agent(model=llm, tools=[extract_text], system_prompt=system_prompt)

# result = agent.invoke(
#     {"messages": [HumanMessage(content="suggest meals from ..\..\menu.jpg")]}
# )


# output = json.loads(result["messages"][-1].content.replace("'", '"'))
# print(output)
# print(type(output))
