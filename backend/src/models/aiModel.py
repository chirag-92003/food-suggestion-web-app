from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable, RunnableLambda
import base64
from PIL import Image
import io
import json


# ---------------- OCR CHAIN ---------------- #
class OcrChain(Runnable):
    def __init__(self, model: str, base_url: str = "http://localhost:11434"):
        self._llm = ChatOllama(model=model, base_url=base_url, temperature=0)

        system_prompt = "Perform OCR on the image. Return ONLY extracted text."

        self._prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                (
                    "user",
                    [
                        {"type": "text", "text": "Extract text:"},
                        {
                            "type": "image_url",
                            "image_url": {"url": "data:image/png;base64,{image_data}"},
                        },
                    ],
                ),
            ]
        )

        self._chain = self._prompt | self._llm

    def _read_image(self, image_filename: str) -> str:
        image = Image.open(image_filename)
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        return base64.b64encode(buffer.getvalue()).decode("utf-8")

    def invoke(self, image_filename: str, config=None) -> str:
        image_data = self._read_image(image_filename)
        result = self._chain.invoke({"image_data": image_data})
        return result.content


# ---------------- MAIN LLM ---------------- #
main_llm = ChatOllama(model="qwen3.5:cloud", temperature=0)


# ---------------- PROMPT ---------------- #
system_prompt = """
Based on the extracted text, suggest healthy meals.

Return ONLY a JSON array of objects with:
meal, calories, protein, fat, carbs.
"""


prompt = ChatPromptTemplate.from_messages(
    [("system", system_prompt), ("user", "{ocr_text}")]
)


# ---------------- CHAIN ---------------- #

ocr = OcrChain(model="qwen3.5:cloud")

# Convert OCR string → dict for prompt
format_step = RunnableLambda(lambda text: {"ocr_text": text})

# Full pipeline
chain = ocr | format_step | prompt | main_llm


# ---------------- RUN ---------------- #

result = chain.invoke("menu.jpg")
output = json.loads(result.content)
print(output)
print(type(output))
