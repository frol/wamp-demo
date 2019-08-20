FROM mhart/alpine-node:12

WORKDIR /wamp-demo/backend
ENV HOME=/tmp
COPY ./package.json ./package-lock.json ./
USER root
RUN npm clean-install --prod && \
    rm -r /tmp/.npm && \
    chown nobody: .
COPY ./ ./
RUN chown -R nobody: .

USER nobody
CMD ["/bin/sh", "-c", "exec npm run start"]
