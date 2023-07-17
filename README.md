# VidFeed

https://vidfeed.seanmorr.is/

* React
* Ruby on Rails
* Postgres
* Heroku
* Amazon S3
* CloudFlare
* Docker

##  Development Instance

You only need Docker & Docker Compose installed to get started developing VidFeed. All the infrastructure is containerized.

Just checkout the project, switch to the new directory and start the cluster. Rails takes up the root of the project, and the React frontend can be found in the `frontend/` directory. Note that `./npm-install` will run the install within docker as well.

```bash
$ git clone git@github.com:seanmorris/vid-feed.git
$ ./npm-install
$ cd vid-feed
$ docker login
$ docker-compose up -d
$ ./rails-local db:migrate
$ ./rails-local db:seed
```

Once its set up you can then start the project with just:

```bash
$ docker-compose up
$ docker-compose up -d # Optionally, run in the background
```

You can also stop it from another terminal with:

```bash
$ docker-compose down
```

### Important information regarding ports 3000 & 3001:

Both the frontend and the backend can be served through one server. This is achieved by inspecting the `accept` header of the HTTP request during Rails' routing phase.

By default, the *development* instance will serve the backend over **port 3000** and the frontend over **port 3001**.

This is important during development, since the **latest production build** of the **frontend** will be served from the **backend** over **port 3000**. Only upon execution of the pre-commit hook, or alternatively manually rebuilding the UI with `./build-ui` will cause this to refresh.

The cause of this is that the `frontend/public` folder is actually *symlinked* back up to `public/` in the root of the project. This allows Rails to serve the pre-built react application, like it would any other set of static assets. However, this version of the application does not include the hot-reloading behavior found in development.

The *development* instance of the same application will be served on **port 3001**. This version will have all the development bells and whistles like hot module reloading. Appropriate CORS headers will be served from Rails in development to account for this.

## Production Instance

The production server is run in Heroku and is automatically updated with every merge to the `master` branch in git.

## Running commands inside docker

You can use `./rails-local` and `./bundle-local` scripts to access those applications inside docker.

For example:

```bash
$ ./rails-local db:version
Creating vid-feed_web_run ... done
Current version: 20230716192559
```

## Running commands in Heroku

Use the `./rails-remote` command to run a rails command in the production cluster:

```bash
$ heroku login # important to login to heroku-cli first...
...
$ ./rails-remote db:version
Running rails db:version on ⬢ vid-feed... up, run.7361 (Basic)
Current version: 20230716192559
```

### Building the UI

Run `./build-ui` to invoke a container that will build the production version

### Git Hook

The frontend never needs to be built manually, since there is a git precommit hook that will run and invoke the command before every commit.

