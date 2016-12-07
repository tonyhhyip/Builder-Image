# Builder Base Image

Docker Images, Basic Files and Directories for build sites


## Development and Local Build

To use this builder directly, you need to install `node` (> 6.8)
and `yarn` (> 0.16).

It is recommended to use [nvm][nvm] for the installation. After nvm
was setup:

```bash
nvm install stable.
nvm use stable
npm install -g yarn
```

[nvm]: https://github.com/creationix/nvm


### Development

You may run your site with the development mode:

```bash
yarn dev
```

### Build the Site

You may build the site in `./public` with the command:

```bash
yarn build
```

You may partially build assets with gulp commands. You may find all gulp
options with the help command:

```bash
./node_modules/.bin/gulp help
```


## Building with Docker

You may use this repository to build your site in a [Docker][docker] image.

[docker]: https://www.docker.com/


### Build the Site

(coming soon)
