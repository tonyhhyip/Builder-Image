FROM node:6-alpine
MAINTAINER 404 Busters Team
LABEL image.version="v0.1.0-dev" \
      image.is-alpha="" \
      image.description="This is a static site builder to build site with node in a sandbox." \
      maintainer.name="404 Busters Team" \
      maintainer.url="https://github.com/404busters/"

# basic image setup
WORKDIR /app
VOLUME ["/app/public", "/app/assets"]

# install proper modules
RUN apk add g++ make python --no-cache
COPY . /app
RUN ls -l \
    && npm install --quiet 2 > /dev/null \
    && ls -l

# to actually build the public folder
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["build"]
