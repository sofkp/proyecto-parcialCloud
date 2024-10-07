FROM python:3-slim
WORKDIR /programas/micro3
RUN pip3 install flask
RUN pip3 install pymongo
COPY . .
EXPOSE 8003
CMD [ "python3", "./app.py" ]
