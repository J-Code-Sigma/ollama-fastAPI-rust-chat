#!/bin/sh
set -e

MODEL_URL="https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf"
MODEL_PATH="/models/Llama-3.2-1B-Instruct-Q4_K_M.gguf"

if [ ! -f "$MODEL_PATH" ]; then
  echo "Downloading Llama 3.2 1B GGUF model..."
  curl -L "$MODEL_URL" -o "$MODEL_PATH"
else
  echo "Model already exists. Skipping download."
fi

echo "Starting llama.cpp server..."
# --host 0.0.0.0 to allow connections from other containers
# --port 11434 to keep existing mapping or change as needed
# -m for the model path
# --nobrowser to disable auto-opening browser
./llama-server --host 0.0.0.0 --port 11434 -m "$MODEL_PATH" --nobrowser
