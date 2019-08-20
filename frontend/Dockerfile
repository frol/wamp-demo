FROM mhart/alpine-node:12 AS build

WORKDIR /frontend
ENV HOME=/tmp
COPY ./package.json ./package-lock.json ./
RUN npm install --prod && \
    cp -a node_modules ../production_node_modules && \
    npm install

COPY ./ ./

RUN npm run build


FROM mhart/alpine-node:slim-12

WORKDIR /frontend
ENV HOME=/tmp \
    PORT=3000
COPY --from=build /production_node_modules ./node_modules
COPY --from=build /frontend/static ./static
COPY --from=build /frontend/next.config.js ./
COPY --from=build /frontend/.next ./.next

CMD ["/bin/sh", "-c", "exec ./node_modules/.bin/next start --port $PORT"]
