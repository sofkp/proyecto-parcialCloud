FROM python:3-slim
WORKDIR /apiClientes
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
RUN python3 db.py
CMD ["python", "app.py"]
