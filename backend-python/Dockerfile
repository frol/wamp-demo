FROM frolvlad/alpine-python3

WORKDIR /wamp-demo/backend
ENV HOME=/tmp
COPY ./requirements.txt ./
RUN apk add --no-cache --virtual=.build-dependencies gcc musl-dev python3-dev libffi-dev openssl-dev && \
    pip install -r requirements.txt && \
    apk del .build-dependencies
COPY ./ ./
RUN chown -R nobody: .

USER nobody
CMD ["python", "manage.py", "start"]
