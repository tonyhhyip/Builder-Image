# Builder Base Image [![Travis CI][travis-badge]][travis]

Docker Images, Basic Files and Directories for build sites

[travis]: https://travis-ci.org/404busters/Builder-Image?branch=master
[travis-badge]: https://travis-ci.org/yookoala/Builder-Image.svg?branch=master


## Development and Local Build

To use this builder directly, you need to install `node` (>= 6.9) and `yarn` (> 0.16).
As `node-gyp` is using, you have to install **make**, **g++** and **python**.

### Debian and Ubuntu

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
echo "deb https://deb.nodesource.com/node_6.x $(lsb_release -s -c) main" | sudo tee /etc/apt/sources.list.d/nodesource.list
echo "deb-src https://deb.nodesource.com/node_6.x $(lsb_release -s -c) main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

### Mac
It is recommended to use [nvm][https://github.com/creationix/nvm] for the installation. After nvm
was setup:

```bash
nvm install stable
nvm use stable
npm install -g yarn
```

### Windows
God bless you

### Development

You may run your site with the development mode:

```bash
yarn dev
```

The resulting files will be in the folder "[./public](public)" and a development
server will be started listing at "[http://localhost:8080](http://localhost:8080)".

### Build the Site with your OS

You may build the production site directly with NodeJS in your OS. The
resulting files will be in the folder "[./public](public)".

The command to build the whole site:

```bash
yarn build
```

You may partially build assets with gulp commands. You may find all gulp
options with the help command:

```bash
./node_modules/.bin/gulp help
```


## Building with Docker

You may use this repository to build your site with a [Docker][docker] image.

[docker]: https://www.docker.com/

### Build the Docker Image

If you prefer to build your own docker image, you will first need to make sure
you local docker have proper network setup. On Ubuntu, you should edit the file
`/etc/default/docker`. Find this line and uncomment it.

```
DOCKER_OPTS="--dns 8.8.8.8 --dns 8.8.4.4"
```

Run this after the change:

```bash
sudo systemctl restart docker
```

Then build the image with this command:

```bash
docker build -t="404busters/builder" .
```

### Build the Site

With the docker image in your local docker system, you have to define a local
folder to receive the result. Assume you want to have the files built into
`$PWD/public`:

```bash
docker run --name builder -it --rm \
 -v $PWD/public:/app/public 404busters/builder
```

Please replace the folder `$PWD/public` to a path that suit your needs.

### Interactive Development

You may also use the image in interactive development mode. You'll need to
specify the `assets` folder to build from. For example, if your developing
assets are located at `$PWD/myAssets`:

```bash
docker run --name builder -it --rm \
  -v $PWD/public:/app/public -v $PWD/assets:/app/assets \
  404busters/builder dev
```

### More Commands

Docker will pass all the commands to the gulp. You may see all the command
options with this:

```bash
docker run --name builder -it --rm 404busters/builder help
```
