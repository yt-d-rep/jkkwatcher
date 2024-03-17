develop:
	@echo "Starting development server..."
	@envsubst < ./dev/.env.template > ./dev/.env
	docker compose -f ./dev/docker-compose.dev.yml up --build
