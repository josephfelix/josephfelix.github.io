DOCKERCOMPOSE 	= docker-compose
XDGOPEN		= xdg-open
DOCKER		= docker

all: down run
build:
	$(DOCKER) run --rm -v $(pwd):/srv/jekyll jekyll/jekyll:latest jekyll build
run:
	$(XDGOPEN) http://127.0.0.1:4000
	$(DOCKERCOMPOSE) up
down:
	$(DOCKERCOMPOSE) down
config:
	$(DOCKERCOMPOSE) config
restart: down run
