FROM python:3.11-slim

# Install system dependencies including Tesseract OCR
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    libtesseract-dev \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY <<EOF /app/requirements.txt
fastapi
uvicorn
python-multipart
langchain
langchain-community
langchain-core
langchain-ollama
pillow
pytesseract
pydantic
EOF

RUN pip install --no-cache-dir -r requirements.txt

COPY src/ /app/

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
