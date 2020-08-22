DOCKERCOMPOSE 	= docker-compose
XDGOPEN		= xdg-open
DOCKER		= docker
GIT		= git

all: down run
install:
	$(GIT) submodule init
	$(GIT) submodule update
build-jekyll:
	$(DOCKER) run --rm -v $(pwd):/srv/jekyll jekyll/jekyll:latest jekyll build
build: install build-jekyll
open:
	$(XDGOPEN) http://127.0.0.1:4000
up:
	$(DOCKERCOMPOSE) up
run: install open up
down:
	$(DOCKERCOMPOSE) down
config:
	$(DOCKERCOMPOSE) config
restart: down run
