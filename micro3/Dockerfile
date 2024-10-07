FROM python:3.8-slim
WORKDIR /programas/micro3
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8003
CMD ["python", "./app.py"]

