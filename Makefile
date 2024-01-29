# Source files and target executable
SRC_DIR = src
OBJ_DIR = build
PACKAGE_MANAGER = yarn

# Targets
all: $(EXECUTABLE)

notification:
	pnpm dev:n

users:
	pnpm dev:u

proxy:
	pnpm dev:p

build1:
	$(PACKAGE_MANAGER) build

run-pm2:
	pm2 start www

clean:
	rm -rf $(OBJ_DIR)

.PHONY: all clean
