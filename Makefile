DOCKERCOMPOSE 	= docker-compose
XDGOPEN		= xdg-open
DOCKER		= docker
NPM 		?= $(shell which npm)
YARN 		?= $(shell which yarn)
PKG_MANAGER 	?= $(if $(YARN),$(YARN),$(NPM))

all: down run
install:
	$(PKG_MANAGER) install
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
