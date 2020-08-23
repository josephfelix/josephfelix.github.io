DOCKERCOMPOSE 	= docker-compose
XDGOPEN		= xdg-open
DOCKER		= docker
GIT		= git
NPM 		?= $(shell which npm)
YARN 		?= $(shell which yarn)
PKG_MANAGER 	?= $(if $(YARN),$(YARN),$(NPM))

all: down run
install:
	$(GIT) submodule init
	$(GIT) submodule update
	$(PKG_MANAGER) install
build-jekyll-dev:
	$(DOCKER) run --rm -v $(shell pwd):/srv/jekyll jekyll/jekyll:latest jekyll build
build-jekyll-prod:
	$(DOCKER) run --rm -v $(shell pwd):/srv/jekyll -e JEKYLL_ENV=production jekyll/jekyll:latest jekyll build
build: install build-jekyll-dev
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
deploy-ghpages:
	$(PKG_MANAGER) run deploy
deploy: install build-jekyll-prod deploy-ghpages
