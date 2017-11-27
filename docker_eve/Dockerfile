FROM python:3
MAINTAINER Raquib Talukder

EXPOSE 5000

WORKDIR /user/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "./run.py"]