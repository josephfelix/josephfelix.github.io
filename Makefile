DOCKERCOMPOSE 	= docker-compose
XDGOPEN		= xdg-open
DOCKER		= docker
NPM 		?= $(shell which npm)
YARN 		?= $(shell which yarn)
PKG_MANAGER 	?= $(if $(YARN),$(YARN),$(NPM))

all: down run
build:
	$(PKG_MANAGER) install
	$(DOCKER) run --rm -v $(pwd):/srv/jekyll jekyll/jekyll:latest jekyll build
run:
	$(PKG_MANAGER) install
	$(XDGOPEN) http://127.0.0.1:4000
	$(DOCKERCOMPOSE) up
down:
	$(DOCKERCOMPOSE) down
config:
	$(DOCKERCOMPOSE) config
restart: down run
