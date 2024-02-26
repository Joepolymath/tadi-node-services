# Source files and target executable
SRC_DIR = src
OBJ_DIR = build
PACKAGE_MANAGER = yarn
NPM_BIN = /Users/equallyai/Documents/Projects/tadi/tadi-node-services/node_modules/.bin

# Targets
all: $(EXECUTABLE)

notification:
	pnpm dev:n

users:
	pnpm dev:u

proxy:
	pnpm dev:p

grpc:
	npx grpc_tools_node_protoc --plugin=protoc-gen-ts=$(NPM_BIN)/protoc-gen-ts --ts_out=service=grpc-node:./packages/grpc --js_out=import_style=commonjs,binary:./packages/grpc --grpc_out=./packages/grpc ./users.proto

build1:
	$(PACKAGE_MANAGER) build

dbuild-users:
	docker build -t user-service-image -f ./packages/usersService/Dockerfile .

run-pm2:
	pm2 start www

clean:
	rm -rf $(OBJ_DIR)

.PHONY: all clean
