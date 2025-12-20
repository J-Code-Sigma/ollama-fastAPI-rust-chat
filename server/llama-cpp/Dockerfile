# Build stage
FROM debian:bookworm-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    cmake \
    curl \
    libcurl4-openssl-dev \
    && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone specific tag or just main
RUN git clone --depth 1 https://github.com/ggml-org/llama.cpp.git .

# Build the server and install to a temporary directory
# -DGGML_NATIVE=ON ensures it uses Pi's CPU instructions (NEON, etc)
RUN cmake -B build -DGGML_NATIVE=ON -DCMAKE_INSTALL_PREFIX=/install \
    -DLLAMA_BUILD_SERVER=ON -DLLAMA_CURL=ON && \
    cmake --build build --config Release -j$(nproc) && \
    cmake --install build

# Runtime stage
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    libcurl4 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /

# Copy the entire installation (bin and lib)
COPY --from=builder /install /usr/local

# Update linker cache to find the new .so files
RUN ldconfig

# The startup script will be mounted by docker-compose
ENTRYPOINT [ "/bin/sh", "/start-llama.sh" ]
