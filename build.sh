docker build -f Dockerfile . -t docker-registry.apibrew.io/documentation:latest --platform linux/amd64 || exit 1

docker push docker-registry.apibrew.io/documentation:latest

k0s kubectl rollout restart deployment documentation
