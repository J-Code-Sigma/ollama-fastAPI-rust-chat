#!/bin/sh
set -e

echo "Starting Ollama server..."
ollama serve &

echo "Waiting for Ollama to be ready..."
until ollama list >/dev/null 2>&1; do
  sleep 1
done

if ollama list | grep -q "llama3.2"; then
  echo "Model 'llama3.2' already exists. Skipping pull."
else
  echo "Pulling Llama 3.2 model..."
  ollama pull llama3.2
fi

echo "Ollama is ready."
wait
