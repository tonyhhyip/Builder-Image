FROM buildpack-deps:jessie

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update

RUN apt-get install -y nodejs yarn git && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g npm

ENV PATH $PATH:$HOME/.yarn-config/bin

COPY REPO /
COPY BRANCH /

COPY docker-entrypotin.sh /

RUN cd / && git clone -b `cat /BRANCH` `cat /REPO` website

ENTRYPOINT ["/docker-entrypoint.sh"]
