docker run --rm -it --name clava-fccm-2025-demo-local-$(date +%Y%m%d%H%M%S) -v "$PWD":/app -w /app clava-fccm-2025-demo bash -c "npm install && npm run build && bash"

