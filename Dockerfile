FROM node:6
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
COPY [".", "./"]
RUN ls -l \
    && npm install -g yarn \
    && npm install node-sass \
    && yarn install --ignore-optional \
    && npm cache clean \
    && yarn cache clean \
    && ls -l

# to actually build the public folder
ENTRYPOINT ["./scripts/run.sh"]
CMD ["build"]
