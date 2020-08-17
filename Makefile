DOCKERCOMPOSE 	= docker-compose
XDGOPEN		= xdg-open
COPY		= cp

all: down run
run:
	$(XDGOPEN) http://127.0.0.1:4000
	$(DOCKERCOMPOSE) up
down:
	$(DOCKERCOMPOSE) down
config:
	$(DOCKERCOMPOSE) config
restart: down run
