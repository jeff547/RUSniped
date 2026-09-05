FROM python:3.13-slim

WORKDIR /app/apps/server

COPY apps/server/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY apps/server/ ./

EXPOSE 3000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "3000", "--log-level", "info"]
