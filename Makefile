develop:
	@echo "Starting development server..."
	docker compose -f ./dev/docker-compose.dev.yml up --build

setup:
  npm i

watch:
	make setup
  npm run build:watch

run:
  node dist/main.js
